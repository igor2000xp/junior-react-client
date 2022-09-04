export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: IAttributeSet[];
  prices: IPrice[];
  brand: string;
}
export const productInit = {
  id: '',
  name: '',
  inStock: true,
  gallery: [''],
  description: '',
  category: '',
  attributes: [
    {
      id: '',
      name: '',
      type: '',
      items: [{ displayValue: '', value: '', id: '' }],
    },
  ],
  prices: Array({ currency: '', amount: 0 }),
  brand: '',
};
export interface IAttributeSet {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}
export interface IAttribute {
  displayValue: string;
  value: string;
  id: string;
}
export interface IPrice {
  currency: string;
  amount: number;
}
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

export interface ICurrency {
  label: Label;
  symbol: SymbolCurrency;
}
export interface ICategory {
  name: string;
}
export interface ICategoryWithActive {
  name: string;
  isActive: boolean;
}
export const categoriesInit = [
  { name: 'all', isActive: true },
  { name: 'clothes', isActive: false },
  { name: 'tech', isActive: false },
];
