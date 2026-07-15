export async function getProducts() {
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_PRODUCT
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_PRODUCT`.'
    );
  }
  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { JWT } = require('google-auth-library');
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  console.log('KEY RAW length:', privateKey.length);
  console.log('KEY RAW first50:', JSON.stringify(privateKey.substring(0, 50)));
  console.log('KEY RAW last30:', JSON.stringify(privateKey.substring(privateKey.length - 30)));
  console.log('KEY has newline:', privateKey.includes('\n'));
  console.log('KEY has escaped-n:', privateKey.includes('\\n'));
  console.log('KEY has escaped-r-n:', privateKey.includes('\\r\\n'));

  if (!privateKey.includes('\n')) {
    const body = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\\n/g, '')
      .trim();
    privateKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
    console.log('KEY RECONSTRUCTED first50:', JSON.stringify(privateKey.substring(0, 50)));
    console.log('KEY RECONSTRUCTED length:', privateKey.length);
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
