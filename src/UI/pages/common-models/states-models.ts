import { Label, SymbolCurrency } from './common-models';

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
export interface IAttrActive {
  id: string;
  value: string;
  attrID: string;
}
export const activeAttributesInit = {
  id: '',
  value: '',
  attrID: '',
};
