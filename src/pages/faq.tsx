import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import Accordion from 'components/accordion';

const accordionData = [
  {
    id: 1,
    title: 'How do I download my ebooks?',
    details:
      'After completing checkout, you will receive an email with download links for your ebooks. Click the links to download your files in the format you selected.',
  },
  {
    id: 2,
    title: 'What formats are available?',
    details:
      'We offer ebooks in PDF, EPUB, and MOBI formats. PDF is best for desktop reading, EPUB for most e-readers and mobile devices, and MOBI for older Kindle devices.',
  },
  {
    id: 3,
    title: 'Can I read ebooks offline?',
    details:
      'Yes! Once downloaded, you can read your ebooks offline on any device that supports the file format. Simply transfer the file to your device or use a compatible reading app.',
  },
  {
    id: 4,
    title: 'Are the ebooks free?',
    details:
      'Many of our ebooks are available for free. Paid ebooks are priced individually and can be purchased through our secure checkout process.',
  },
];

export default function FAQ() {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Frequently asked questions about Thirty Bob Library ebooks." />
        <title>F.A.Q - Thirty Bob Library</title>
      </Head>

      <div className="py-35px px-0">
        <h3 className="w-full flex justify-center mb-30px text-24px text-gray-900 text-center font-semibold">
          F.A.Q
        </h3>
        <Accordion items={accordionData} />
      </div>
    </Layout>
  );
}
