import React from 'react';
import FeatureBlock from 'components/feature-block';

const data = [
  {
    id: 1,
    background: '#feeec8',
    title: 'Browse Library',
    description: 'Explore our collection of ebooks across various genres and categories.',
  },
  {
    id: 2,
    background: '#ceeffe',
    title: 'Request a Book',
    description: 'Can\'t find what you\'re looking for? Submit a request for any title you\'d like to read.',
  },
  {
    id: 3,
    background: '#d4f8c4',
    title: 'We Source It',
    description: 'Our team works to find and acquire the ebooks you\'ve requested.',
  },
  {
    id: 4,
    background: '#d8dafe',
    title: 'Get Notified',
    description: 'Once your requested book is available, we\'ll send you a notification with access details.',
  },
];

export default function HowItWorks() {
  return (
    <div className="flex w-full px-15px lg:px-35px mt-35px xxl:mt-60px">
      <div className="flex w-full px-20px md:p-30px py-40px rounded border border-gray-300 bg-white">
        <div className="feature-block-wrapper w-full grid grid-cols-1 gap-x-30px gap-y-40px md:grid-cols-2 xl:grid-cols-4 xxl:gap-30px">
          {data.map((item, index) => (
            <FeatureBlock
              key={item.id}
              title={item.title}
              description={item.description}
              counterBg={item.background}
              counter={index + 1}
              className="feature-block"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
