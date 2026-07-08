const nodeCrypto = require('crypto');
const axios = require('axios');

function base64urlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function normalizePrivateKey(key) {
  if (!key) return key;
  let pk = key
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
  if (!pk.includes('\n')) {
    const body = pk
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\\n/g, '')
      .trim();
    pk = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
  }
  return pk;
}

async function getAccessToken(clientEmail, privateKey) {
  const key = normalizePrivateKey(privateKey);
  const keyObj = nodeCrypto.createPrivateKey(key);

  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600;

  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: expiry,
    iat: now,
  };

  const headerB64 = base64urlEncode(JSON.stringify(header));
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  const sign = nodeCrypto.createSign('SHA256');
  sign.update(signingInput);
  const signature = sign
    .sign(keyObj, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const jwt = `${signingInput}.${signature}`;

  const res = await axios.post(
    'https://oauth2.googleapis.com/token',
    null,
    {
      params: {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      },
    }
  );

  return res.data.access_token;
}

module.exports = { getAccessToken, normalizePrivateKey };
