import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import Accordion from 'components/accordion';

const accordionData = [
  {
    id: 1,
    title: 'How does Thirty Bob Library work?',
    details:
      'Thirty Bob Library is an ebook library where you can browse our catalog and request books you\'d like to read. Once you submit a request, we source the ebook and notify you when it\'s available.',
  },
  {
    id: 2,
    title: 'How do I request a book?',
    details:
      'Click the "Request a Book" button on the homepage or in the menu. Fill in the book title, author, your name, and email. We\'ll do our best to find the ebook for you.',
  },
  {
    id: 3,
    title: 'How long does it take to get my requested book?',
    details:
      'We typically process book requests within 1-3 business days. You\'ll receive an email notification as soon as your requested ebook is available.',
  },
  {
    id: 4,
    title: 'What formats are the ebooks available in?',
    details:
      'Our ebooks are available in PDF and EPUB formats, depending on the title. You can see the available format on each book\'s details page.',
  },
  {
    id: 5,
    title: 'Is there a limit to how many books I can request?',
    details:
      'There\'s no limit! You can request as many books as you\'d like. We process each request individually and notify you when each one is ready.',
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
        <meta
          name="Description"
          content="Frequently asked questions about Thirty Bob Library, requests, and how our ebook library works."
        />
        <title>FAQ — Thirty Bob Library</title>
      </Head>

      <div className="py-35px px-4 md:p-35px">
        <h3 className="w-full flex justify-center mb-30px text-24px text-gray-900 text-center font-semibold">
          F.A.Q
        </h3>
        <Accordion items={accordionData} />
      </div>
    </Layout>
  );
}
