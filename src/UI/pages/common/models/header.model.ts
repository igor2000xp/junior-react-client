export interface ICurrency {
  label: Label;
  symbol: SymbolCurrency;
}
export interface IState {
  label: Label;
  symbol: SymbolCurrency;
  isShown: boolean;
}
export interface INavigateState {
  activeAll: string;
  activeTech: string;
  activeClothes: string;
}

export const navigateStateInit = {
  activeAll: '',
  activeTech: '',
  activeClothes: '',
};

export enum Label {
  Usd = 'USD',
  Aud = 'AUD',
  Gbr = 'GBR',
  Jpy = 'JPY',
  Rub = 'RUB',
}
export enum SymbolCurrency {
  SymbolUsd = '$',
  SymbolAud = '£',
  SymbolGbr = 'A$',
  SymbolJpy = '¥',
  SymbolRub = '₽',
}
export const currencyInit = [
  { label: Label.Usd, symbol: SymbolCurrency.SymbolUsd },
  { label: Label.Gbr, symbol: SymbolCurrency.SymbolGbr },
  { label: Label.Aud, symbol: SymbolCurrency.SymbolAud },
  { label: Label.Jpy, symbol: SymbolCurrency.SymbolJpy },
  { label: Label.Rub, symbol: SymbolCurrency.SymbolRub },
];

export interface IProps {
  getCurrency: (label: Label, symbol: SymbolCurrency) => void;
}
