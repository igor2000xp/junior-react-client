import {
  IActiveAttr,
  ILocalBasket,
  localActiveAttributesInit,
  localBasketItemInit,
} from '../../../../common-models';
import equal from 'fast-deep-equal/es6/react';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../../constants';

export const settleFullBasket = (
  basket: ILocalBasket[],
  activeAttr: IActiveAttr,
) => {
  // Check for the same product id and set of attributes
  let isAttributes = false;
  const newBasketItem: ILocalBasket = {
    quantity: 1,
    ...activeAttr,
  };
  const isProduct = basket.findIndex((item) => {
    return item.productId === activeAttr.productId;
  });
  if (isProduct !== -1) {
    isAttributes = equal(
      basket[isProduct].activeAttributes,
      activeAttr.activeAttributes,
    );
    // if it true it adds the same product +1
    if (isAttributes) {
      basket[isProduct].quantity += 1;
    } else {
      basket.push(newBasketItem);
    }
    //  else just push the basket
  } else {
    basket.push(newBasketItem);
  }
  localStorage.setItem(LOCAL_BASKET, JSON.stringify(basket));
};

export const getLocalBasket = async (): Promise<ILocalBasket[]> => {
  const localBasket = localStorage.getItem(LOCAL_BASKET);
  return localBasket ? JSON.parse(localBasket) : [localBasketItemInit];
};

export const getActiveAttr = async (): Promise<IActiveAttr> => {
  const activeDraftAttr = await localStorage.getItem(ACTIVE_PRODUCT_ATTRIBUTES);
  return activeDraftAttr
    ? JSON.parse(activeDraftAttr)
    : localActiveAttributesInit;
};
