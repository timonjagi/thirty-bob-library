import React, { useState, useContext } from 'react';
import { Scrollbar } from 'components/scrollbar';
import { CURRENCY } from 'helpers/constants';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import ArrowLeft from 'assets/icons/arrow-left';

export default function ProductDetails() {
  const [visibility, setVisibility] = useState(true);
  const { state, dispatch } = useContext(DrawerContext);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const hideDetails = () => {
    dispatch({
      type: 'TOGGLE_PRODUCT_DETAIL',
      payload: {
        showDetails: false,
      },
    });

    dispatch({
      type: 'SLIDE_CART',
      payload: {
        open: false,
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-center relative px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideDetails}
          aria-label="close"
        >
          <ArrowLeft />
        </button>

        <h2 className="font-bold text-24px m-0">Book Details</h2>
      </div>

      <Scrollbar className="details-scrollbar flex-grow">
        <div className="flex flex-col p-30px pt-0">
          <div className="flex items-center justify-center w-full h-360px overflow-hidden rounded mb-30px">
            <img src={state.item.image} alt={`${state.item.name} cover`} />
          </div>

          <div className="flex flex-col items-start mb-4">
            <span className="text-gray-900 font-semibold mb-2">
              {CURRENCY}
              {state.item.price}
            </span>
            <span className="mb-3 text-18px">{state.item.name}</span>
            <span className="text-gray-500 text-14px mb-2">{state.item.author}</span>

            {visibility && state.item.description && (
              <p className="my-5 text-gray-700 text-14px leading-relaxed">
                {state.item.description}
              </p>
            )}

            {state.item.description && (
              <button
                className="font-semibold text-11px text-gray-800 mt-2 focus:outline-none"
                onClick={toggleVisibility}
                aria-label="details"
              >
                {visibility ? 'Less Details' : 'More Details'}
              </button>
            )}
          </div>

          <div className="flex w-full flex-col">
            {state.item.format && (
              <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
                <span className="text-gray-500 text-11px mb-2">Format</span>
                <span className="font-normal text-13px text-gray-900 capitalize">
                  {state.item.format}
                </span>
              </div>
            )}

            {state.item.category && (
              <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
                <span className="text-gray-500 text-11px mb-2">Category</span>
                <span className="font-normal text-13px text-gray-900 capitalize">
                  {state.item.category}
                </span>
              </div>
            )}

            {state.item.pages && (
              <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
                <span className="text-gray-500 text-11px mb-2">Pages</span>
                <span className="font-normal text-13px text-gray-900">
                  {state.item.pages}
                </span>
              </div>
            )}

            {state.item.language && (
              <div className="flex flex-col justify-start full mt-10 pr-30px even:pr-0">
                <span className="text-gray-500 text-11px mb-2">Language</span>
                <span className="font-normal text-13px text-gray-900 capitalize">
                  {state.item.language}
                </span>
              </div>
            )}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
