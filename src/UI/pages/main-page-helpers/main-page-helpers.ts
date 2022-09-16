import client from '../../../graphql/apollo';
import { GetProductsByCategoryDocument } from '../../../graphql/generated';
import { ILocalBasket, IProduct, productInit, SymbolCurrency } from '../common-models';
import { ILocalBasketForTotal } from '../product-cards/plp-card/card-item/total-block';

export const getProductsList = async (categoryId: string):Promise<IProduct[] | undefined > => {
  try {
    const { data } = await client.query({
      query: GetProductsByCategoryDocument,
      variables: {
        category: categoryId,
      },
    });
    const { category } = data;
    const { products } = category;
    return products as IProduct[];
  } catch (err) {
    console.log('Error loading data from server = ', err);
  }
}
export const getProductsListFromBasket = async (localBasket: ILocalBasket[], currentCurrency: SymbolCurrency): Promise<ILocalBasketForTotal[]> => {
  const  productsAll: IProduct[] | undefined = await getProductsList('all');
  const product: IProduct[] = productsAll ? productsAll : [productInit];

  return localBasket.map((item) => {
    const productItem = product.find((itemProduct) => {
      return itemProduct.id === item.productId;
  });

  const realProductItem = productItem ? productItem: productInit;
  const arrayProductItem = Array.isArray(realProductItem.prices) ? realProductItem.prices: [realProductItem.prices];
  const currentAmount = arrayProductItem.find((itemAmount) => {
    return itemAmount.currency.symbol === currentCurrency;
  });
  return {
    productId: item.productId,
    amount: currentAmount ? currentAmount.amount: 0,
    quantity: item.quantity,
    symbolPrice: currentCurrency,
  }
});
}
