import { ILocalBasket, localBasketItemInit } from '../../../common-models';
import { LOCAL_BASKET } from '../../../../../constants';

export const changeQuantityInBasket = async (
  quantityInBasketState: number,
  propsBasket: ILocalBasket,
): Promise<number> => {
  let newBasketForRecord: ILocalBasket[];
  const basketItemCurrentId = getBasketItemID(propsBasket);
  const newBasket: ILocalBasket[] = await getLocalBasket();
  const newBasketItem: ILocalBasket | undefined = newBasket.find((item) => {
    return basketItemCurrentId === getBasketItemID(item);
  });
  const newBasketItemChecked = newBasketItem
    ? newBasketItem
    : localBasketItemInit;
  newBasketItemChecked.quantity = quantityInBasketState;
  if (newBasketItemChecked.quantity === 0 && newBasketItemChecked.productId !== '') {
    newBasketForRecord = newBasket.filter((item) => {
      return basketItemCurrentId !== getBasketItemID(item);
    });
    newBasketForRecord = typeof newBasketForRecord[0] === 'undefined' ? [localBasketItemInit] : newBasketForRecord;
  } else {
    newBasketForRecord = newBasket.map((item) => {
      return getBasketItemID(item) === basketItemCurrentId
        ? newBasketItemChecked
        : item;
    });
  }
  localStorage.setItem(LOCAL_BASKET, JSON.stringify(newBasketForRecord));
  return newBasketItemChecked.quantity;
};

export const getBasketItemID = (item: ILocalBasket) => {
  return item.activeAttributes.reduce((acc, attrItem) => {
    return `${acc}-${attrItem.id}`;
  }, String(item.productId));
};

export const getLocalBasket = async () => {
  const localBasket: ILocalBasket[] = await JSON.parse(
    localStorage.getItem(LOCAL_BASKET) as string,
  );
  return localBasket;
};
