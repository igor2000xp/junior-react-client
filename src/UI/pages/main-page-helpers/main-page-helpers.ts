import client from '../../../graphql/apollo';
import { GetProductsByCategoryDocument } from '../../../graphql/generated';
import { ILocalBasket, ILocalBasketForTotal, IProduct, SymbolCurrency, zeroCurrencyInit, } from '../common-models';
import { LOCAL_CURRENT_CURRENCY, VAT_RATE } from '../../../constants';

export const getProductsList = async (
  categoryId: string,
): Promise<IProduct[] | undefined> => {
  try {
    const { data } = await client.query({
      query: GetProductsByCategoryDocument,
      variables: {
        category: categoryId,
      },
      fetchPolicy: 'no-cache',
    });
    const { category } = data;
    const { products } = category;
    return products as IProduct[];
  } catch (err) {
    console.log('Error loading data from server = ', err);
  }
};
export const getProductsListFromBasket = (
  localBasket: ILocalBasket[],
  currentCurrency: SymbolCurrency,
): ILocalBasketForTotal[] => {

  return localBasket.map((item) => {
    const currencyPrice = item.prices.find((itemPrice) => {
      return itemPrice.currency.symbol === currentCurrency;
    });
    return {
      productId: item.id,
      amount: currencyPrice ? currencyPrice.amount: 0,
      quantity: item.quantity,
      symbolPrice: currentCurrency,
    }
  });
};

export const getTotalItems = (localBasketForTotal: ILocalBasketForTotal[]) => {
  const sumTotal = localBasketForTotal.reduce((acc, item) => {
    return acc + item.quantity * item.amount;
  }, 0);
  const sum = Number(sumTotal.toFixed(2));
  const quantity = localBasketForTotal.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const vat = Number((sumTotal * VAT_RATE).toFixed(2));
  return { sum, quantity, vat };
};

export const initFirstLocalCurrency = async () => {
  const localCurrentCurrency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
  let currentCurrency: typeof zeroCurrencyInit;
  if (!localCurrentCurrency) {
    currentCurrency = zeroCurrencyInit;
    localStorage.setItem(
      LOCAL_CURRENT_CURRENCY,
      JSON.stringify(currentCurrency),
    );
  } else {
    currentCurrency = JSON.parse(localCurrentCurrency);
  }
  return currentCurrency;
};
