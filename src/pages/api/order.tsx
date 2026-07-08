async function createDownloadRecord(data) {
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_ORDER
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_ORDER`.'
    );
  }

  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { getAccessToken } = require('helpers/google-auth');
  const token = await getAccessToken(
    process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_ORDER, {
    token,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  const record = {
    ...data,
    date: new Date().toISOString(),
  };

  await sheet.addRow(record);
}

export default async (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    await createDownloadRecord(req.body);
    res.status(200).json({ message: 'Download recorded successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
