export async function getProducts() {
  const missing = [];
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL) missing.push('GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL');
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) missing.push('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
  if (!process.env.GOOGLE_SPREADSHEET_ID_PRODUCT) missing.push('GOOGLE_SPREADSHEET_ID_PRODUCT');
  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(', ')}`);
  }
  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { JWT } = require('google-auth-library');
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!privateKey.includes('\n')) {
    const body = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\\n/g, '')
      .trim();
    privateKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
  }
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_PRODUCT, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const products = rows?.map((row) => ({
    id: row.get('id'),
    name: row.get('name'),
    image: row.get('image'),
    description: row.get('description'),
    price: row.get('price'),
    type: row.get('type'),
    quantity: row.get('quantity'),
    dosage: row.get('dosage'),
    substance: row.get('substance'),
    manufacturer: row.get('manufacturer'),
  }));
  return products;
}
