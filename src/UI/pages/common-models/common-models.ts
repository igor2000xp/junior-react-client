import { IAttrActive } from './states-models';

export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  // category: string;
  attributes: IProductAttribute[];
  prices: IPrice[];
  brand: string;
}
export interface IProductAttribute {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}
export interface IAttribute {
  id: string;
  displayValue: string;
  value: string;
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
export const zeroCurrencyInit = {
  label: Label.Usd,
  symbol: SymbolCurrency.SymbolUsd,
};

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

export interface ILocalBasket {
  productId: string;
  quantity: number;
  activeAttributes: IAttrActive[];
}
export const localBasketItemInit: ILocalBasket = {
  productId: '',
  quantity: 0,
  activeAttributes: [
    {
      id: '',
      value: '',
      attrID: '',
    },
  ],
};
export interface IActiveAttr {
  productId: string;
  activeAttributes: IAttrActive[];
}
export const localActiveAttributesInit: IActiveAttr = {
  productId: '',
  activeAttributes: [
    {
      id: '',
      value: '',
      attrID: '',
    },
  ],
};
