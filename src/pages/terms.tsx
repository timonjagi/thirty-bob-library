import { useEffect } from 'react';
import Head from 'next/head';
import Layout from 'containers/layout/layout';
import TermsPageContent from 'containers/term/terms';

export default function FAQ() {
  return (
    <Layout style={{ height: 'auto' }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="Description" content="Terms and conditions for Thirty Bob Library." />
        <title>Terms &amp; Conditions - Thirty Bob Library</title>
      </Head>

      <div className="px-0">
        <TermsPageContent />
      </div>
    </Layout>
  );
}
