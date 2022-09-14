import {
  ICurrency,
  ILocalBasket,
  IModifiedProducts,
  IProduct,
  IProductAttribute,
  Label,
  SymbolCurrency,
} from './common-models';
import {
  activeAttributesInit,
  IAttributeColorSwatchState,
} from './states-models';

export interface IHeaderProps {
  getCurrency: (label: Label, symbol: SymbolCurrency) => void;
}
export interface ICommonAttributeSetProps {
  attributes: IProductAttribute[];
  productID: string;
  modifiedProducts?: IModifiedProducts[];
}

export const printToLocalStorageInit = {
  productId: '',
  activeAttributes: [{ ...activeAttributesInit }],
};
export interface IBasicBlockProps {
  product: IProduct;
  currentCurrency: SymbolCurrency;
  modifiedProducts?: IModifiedProducts[];
}
// export interface ICartBasicBlockProps extends IBasicBlockProps {
//   activeAttributes: IActiveBasketAttr;
// }
export interface IAttributeColorSwatchProps {
  attribute: IProductAttribute;
  activeAttribute?: string;
  getAttrState: (value: IAttributeColorSwatchState) => void;
}

export interface ICardItemProps {
  basket: ILocalBasket;
  currency: ICurrency;
}
