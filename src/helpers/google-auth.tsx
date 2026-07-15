function reconstructPemKey(rawKey: string): string {
  const body = rawKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\\r\\n|\\n|\\r|\r|\n/g, '')
    .replace(/\s/g, '')
    .trim()
  return `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`
}

export async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!email || !rawKey) {
    throw new Error(
      'GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set.'
    )
  }

  const { importPKCS8, SignJWT } = await import('jose')

  const pemKey = reconstructPemKey(rawKey)
  const privateKey = await importPKCS8(pemKey, 'RS256')

  const jwt = await new SignJWT({ scope: 'https://www.googleapis.com/auth/spreadsheets' })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .setIssuer(email)
    .setAudience('https://oauth2.googleapis.com/token')
    .sign(privateKey)

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Google token exchange failed: ${err}`)
  }

  const tokens = await response.json()
  return {
    access_token: tokens.access_token,
    token_type: 'Bearer',
    expiry_date: Date.now() + tokens.expires_in * 1000,
  }
}
