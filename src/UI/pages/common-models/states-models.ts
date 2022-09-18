import { ILocalBasket, Label, SymbolCurrency } from './common-models';

export interface IMainPageState {
  error: null;
  isLoaded: boolean;
  categoryIdState: string;
  currentCurrency: SymbolCurrency;
}
export const mainPageStateInit = {
  error: null,
  isLoaded: false,
  categoryIdState: 'all',
  currentCurrency: SymbolCurrency.SymbolUsd,
};

export interface IPdpCardState {
  isLoaded: boolean;
  bigImage: string;
  currentCurrency: SymbolCurrency;
}
export const IPdpCardStateInit = {
  isLoaded: true,
  bigImage: '',
  currentCurrency: SymbolCurrency.SymbolUsd,
};
export interface IHeaderState {
  label: Label;
  symbol: SymbolCurrency;
  isShown: boolean;
}

export interface IAttributeColorSwatchState {
  productId: string;
  activeAttributes: IAttrActive;
}
export const activeAttributesInit: IAttrActive = {
  id: '',
  value: '',
  attrID: '',
};

export interface IAttrActive {
  id: string;
  value: string;
  attrID: string;
}

export interface ICommonAttributeSet {
  prodId: string;
}

export interface IPlpCardState {
  productId: string;
  currentCurrency: SymbolCurrency;
  localBasket: ILocalBasket[];
  isChanged: boolean;
  isChangedPlusMinusButtons: boolean;
  totalItems: number;
}

export interface ICardItemState {
  id: string;
  isModified: boolean;
  quantityInBasket: number;
  mainImageIndex: number;
}
export interface ITotalBlockState {
  quantity: number;
  sum: number;
  vat: number;
  isChangedPlusMinusButtons: boolean;
}
export const totalBlockStateInit: ITotalBlockState = {
  quantity: 0,
  sum: 0,
  vat: 0,
  isChangedPlusMinusButtons: false,
};
