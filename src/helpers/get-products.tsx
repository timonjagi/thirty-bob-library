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
  const { getAccessToken } = require('helpers/google-auth');
  const token = await getAccessToken(
    process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_PRODUCT, {
    token,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const products = rows?.map(
    ({
      id,
      title,
      author,
      cover,
      description,
      price,
      format,
      category,
      pages,
      language,
    }) => ({
      id,
      title,
      author,
      cover,
      description,
      price,
      format,
      category,
      pages,
      language,
    })
  );
  return products;
}
