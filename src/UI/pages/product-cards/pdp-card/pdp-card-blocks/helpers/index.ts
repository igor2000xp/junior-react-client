import {
  IActiveAttrPdp,
  IAttrActive,
  ILocalBasket,
  IProduct,
  localActiveAttributesInit,
  localBasketItemInit,
} from '../../../../common-models';
import equal from 'fast-deep-equal/es6/react';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../../constants';

export const settleFullBasket = (
  localBaskets: ILocalBasket[],
  activeAttr: IActiveAttrPdp[],
  productId: string,
): ILocalBasket[] => {
  // Check for the same product id and set of attributes
  let isAttributes = false;
  const newBasketItem: ILocalBasket = {
    productId,
    quantity: 1,
    activeAttributes: activeAttr,
  };
  const isProduct = localBaskets.findIndex((item) => {
    return item.productId === productId;
  });
  if (isProduct !== -1) {
    isAttributes = equal(localBaskets[isProduct].activeAttributes, activeAttr);
    // if it true it adds the same product +1
    if (isAttributes) {
      localBaskets[isProduct].quantity += 1;
    } else {
      localBaskets.push(newBasketItem);
    }
    //  else just push the basket
  } else {
    if (localBaskets[0].productId === '') {
      localBaskets[0] = newBasketItem;
    } else {
      localBaskets.push(newBasketItem);
    }
  }
  return localBaskets;
};

export const getFromLocalBasket = async (): Promise<ILocalBasket[]> => {
  const localBasket = localStorage.getItem(LOCAL_BASKET);
  return localBasket ? JSON.parse(localBasket) : [localBasketItemInit];
};

export const getActiveAttrFromLocal = async (): Promise<IActiveAttrPdp[]> => {
  const activeDraftAttr = await localStorage.getItem(ACTIVE_PRODUCT_ATTRIBUTES);
  return activeDraftAttr
    ? JSON.parse(activeDraftAttr)
    : localActiveAttributesInit;
};

export const getFirstProdAttrAsActiveAttr = (prod: IProduct): IAttrActive[] => {
  const attr = prod.attributes;
  return attr.map((a): IAttrActive => {
    return {
      id: a.items[0].displayValue,
      value: a.items[0].value,
      attrID: a.id,
    };
  });
};
