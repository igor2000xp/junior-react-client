import {
  ICurrency,
  ILocalBasket,
  IModifiedProduct,
  IModifiedAttrProducts,
  IParams,
  IPrice,
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
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IHeaderProps {
  getCurrency?: (label: Label, symbol: SymbolCurrency) => void;
  isNewBasketToggle?: boolean;
  symbol: SymbolCurrency;
  setCurrency: ActionCreatorWithPayload<SymbolCurrency, string>;
  cart: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[], string>;
}
export interface ICommonAttributeSetProps {
  attributes: IProductAttribute[];
  modifiedProducts?: IModifiedAttrProducts[];
}

export const printToLocalStorageInit = {
  productId: '',
  activeAttributes: [{ ...activeAttributesInit }],
};
export interface IBasicBlockProps {
  modifiedProduct: IModifiedProduct;
  id: string;
  modifiedAttrProducts?: IModifiedAttrProducts[];
}

export type IPropsMainPage = WithRouterProps<IParams>;
export interface INavigateBlockProps {
  page: string;
  setPage: ActionCreatorWithPayload<string, string>;
}
export interface IAttributeColorSwatchProps {
  attribute: IProductAttribute;
  activeAttribute?: string;
  getAttrState: (value: IAttributeColorSwatchState) => void;
}

export interface ICardItemProps {
  basket: ILocalBasket;
  basketId: string;
  currency: ICurrency;
  handlePlusMinusButtons?: () => void;
  cart: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[], string>;
}

export interface ITotalBlockProps {
  cart?: ILocalBasket[];
  currency?: SymbolCurrency;
}

export interface ICartBadgeProps {
  count: number;
}

export interface ICartCountProviderProps {
  renderCount: (count: number) => void;
  cart: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[]>;
}

export interface IMainCartProps {
  symbol?: SymbolCurrency;
  isNewBasketToggle?: boolean;
  cart: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[], string>;
}
export interface IPriceBlockProps {
  prices?: IPrice[];
  symbol?: SymbolCurrency;
  isEmpty?: boolean;
}
export interface IButtonBlockProps {
  inStock: boolean;
  product: IProduct;
  cart: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[], string>;
}
export interface IProductSmallCardProps {
  item: IProduct;
  symbolCurrency?: SymbolCurrency;
  handleGreenButtonFromSmallCart: () => void;
  cart?: ILocalBasket[];
  renewBasket: ActionCreatorWithPayload<ILocalBasket[], string>;
}
