import { ILocalBasket, localBasketItemInit } from '../../../common-models';
import { LOCAL_BASKET } from '../../../../../constants';

export const changeQuantityInBasket = async (
  quantityInBasketState: number,
  propsBasket: ILocalBasket,
) => {
  const basketItemCurrentId = getBasketItemID(propsBasket);
  const newBasket: ILocalBasket[] = await getLocalBasket();
  const newBasketItem: ILocalBasket | undefined = newBasket.find((item) => {
    return basketItemCurrentId === getBasketItemID(item);
  });
  const newBasketItemChecked = newBasketItem
    ? newBasketItem
    : localBasketItemInit;
  newBasketItemChecked.quantity = quantityInBasketState;
  const newBasketForRecord: ILocalBasket[] = newBasket.map((item) => {
    return getBasketItemID(item) === basketItemCurrentId
      ? newBasketItemChecked
      : item;
  });
  localStorage.setItem(LOCAL_BASKET, JSON.stringify(newBasketForRecord));
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