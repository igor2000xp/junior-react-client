import {
  ICurrency,
  ILocalBasket,
  IModifiedProducts,
  IParams,
  IProduct,
  IProductAttribute,
  Label,
  SymbolCurrency,
} from './common-models';
import {
  activeAttributesInit,
  IAttributeColorSwatchState,
} from './states-models';
import { WithRouterProps } from '../with-router/with-router.model';

export interface IHeaderProps {
  getCurrency: (label: Label, symbol: SymbolCurrency) => void;
  isNewBasketToggle?: boolean;

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

export type IPropsMainPage = WithRouterProps<IParams>;

export interface IAttributeColorSwatchProps {
  attribute: IProductAttribute;
  activeAttribute?: string;
  getAttrState: (value: IAttributeColorSwatchState) => void;
}

export interface ICardItemProps {
  basket: ILocalBasket;
  currency: ICurrency;
  handlePlusMinusButtons: () => void;
}

export interface ITotalBlockProps {
  localBasket: ILocalBasket[];
  currentCurrency: SymbolCurrency;
  isChangedPlusMinusButtons: boolean;
  getTotalItemsQuality?: (value: number) => void;
}

export interface ICartBadgeProps {
  count: number;
}

export interface ICartCountProviderProps {
  renderCount: (count: number) => void;
  isChangedQuantity: boolean;
  isChangedCurrencyOrCart: boolean;
}

export interface IPlpCardProps {
  symbol?: SymbolCurrency;
  isNewBasketToggle?: boolean;
}
