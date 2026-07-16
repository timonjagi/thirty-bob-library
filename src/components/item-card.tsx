import React from 'react';
import { CURRENCY } from '../helpers/constants';
import {
  ItemCardBase,
  ItemCardBaseContent,
  ItemCardImage,
  ItemCardContent,
  ItemCardPrice,
  ItemCardName,
  ItemCardInformation,
  ItemCardType,
  ItemCardRoundedDot,
  ItemCardQuantity,
  ItemCardDetailsButton,
} from './utils/theme';

interface ItemProps {
  id: string;
  image: string;
  name: string;
  author: string;
  price: number;
  format: string;
  category: string;
  pages: string;
  language: string;
  description: string;
}

interface ItemCardProps {
  item: ItemProps;
  onClick?: (e: any) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onClick,
}) => {
  const baseClassName = ItemCardBase;
  return (
    <div className={baseClassName}>
      <div className={ItemCardBaseContent}>
        <div className={ItemCardImage}>
          <img
            className="object-cover"
            src={item.image}
            alt={`${item.name} cover`}
          />
        </div>

        <div className={ItemCardContent}>
          <span className={ItemCardPrice}>
            {CURRENCY}
            {item.price}
          </span>
          <span className={ItemCardName}>{item.name}</span>

          <div className={ItemCardInformation}>
            <span className={ItemCardType}>{item.author}</span>
            {item.format && (
              <>
                <span className={ItemCardRoundedDot} />
                <span className={ItemCardQuantity}>{item.format}</span>
              </>
            )}
          </div>

          <button className={ItemCardDetailsButton} onClick={onClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
