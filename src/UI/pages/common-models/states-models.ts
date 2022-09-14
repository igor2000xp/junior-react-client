import { ILocalBasket, Label, SymbolCurrency } from './common-models';

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
}

export interface ICardItemState {
  id: string;
  isModified: boolean;
}

// export interface IAttributeColorPlp {
//   productId: string;
//   activeAttributes: IAttrActive[];
// }

// export const IAttributeColorPlpInit: IAttributeColorPlp = {
//   productId: '',
//   activeAttributes: [activeAttributesInit],
// }
