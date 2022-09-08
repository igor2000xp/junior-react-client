import {
  IActiveBasketAttr,
  IProduct,
  IProductAttribute,
  Label,
  SymbolCurrency,
} from './common-models';
import { activeAttributesInit } from './states-models';

export interface IHeaderProps {
  getCurrency: (label: Label, symbol: SymbolCurrency) => void;
}
export interface ICommonAttributeSetProps {
  attributes: IProductAttribute[];
  productID: string;
}

export const printToLocalStorageInit = {
  productId: '',
  activeAttributes: [{ ...activeAttributesInit }],
};
export interface IBasicBlockProps {
  product: IProduct;
  currentCurrency: SymbolCurrency;
  activeAttributes?: IActiveBasketAttr;
}
export interface ICartBasicBlockProps extends IBasicBlockProps {
  activeAttributes: IActiveBasketAttr;
}
