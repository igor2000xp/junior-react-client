import {
  IActiveAttrPdp,
  IAttrActive,
  ILocalBasket,
  IPrice,
  IProduct,
  IProductAttribute,
  localActiveAttributesInit,
  localBasketItemInit,
} from '../../../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../../constants';

export const settleFullBasket = (
  localBaskets: ILocalBasket[],
  id: string,
  activeAttr: IActiveAttrPdp[],
  attributes: IProductAttribute[],
  prices: IPrice[],
  product: IProduct,
): ILocalBasket[] => {
  // Check for the same product id and set of attributes
  let isAttributes = false;
  const productIdAttr = JSON.stringify(activeAttr) + id;
  const newBasketItem: ILocalBasket = {
    productIdAttr,
    quantity: 1,
    activeAttributes: activeAttr,
    id: product.id,
    name: product.name,
    brand: product.brand,
    gallery: product.gallery,
    attributes,
    prices,
  };
  const isProductIndex = localBaskets.findIndex((item) => {
    return item.productIdAttr === productIdAttr;
  });
  if (isProductIndex !== -1) {
    // isAttributes = equal(localBaskets[isProductIndex].activeAttributes, activeAttr);
    isAttributes = localBaskets[isProductIndex].productIdAttr === productIdAttr;
    // if it true it adds the same product +1
    if (isAttributes) {
      localBaskets[isProductIndex].quantity += 1;
    } else {
      localBaskets.push(newBasketItem);
    }
    //  else just push the basket
  } else {
    if (localBaskets[0].productIdAttr === '') {
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
export const clearActiveAttrInLocal = async () => {
  await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
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
