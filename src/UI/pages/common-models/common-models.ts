import { IAttrActive } from './states-models';
import { ICommonAttributeSetProps } from './props-model';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IParams {
  categoryId: string;
  page?: string;
  setPage: ActionCreatorWithPayload<string, string>;
}

export interface IActiveAttrPdp {
  id: string;
  value: string;
  attrID: string;
}
export const localActiveAttributesPdpInit: IActiveAttrPdp = {
  id: '',
  value: '',
  attrID: '',
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
export const zeroCurrencyInit = {
  label: Label.Usd,
  symbol: SymbolCurrency.SymbolUsd,
};

export interface ICurrency {
  label: Label;
  symbol: SymbolCurrency;
}

export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  attributes: IProductAttribute[];
  prices: IPrice[] | IPrice;
  brand: string;
}
export interface IProductAttribute {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}
export const productAttributeItemInit: IAttribute = {
  id: '',
  displayValue: '',
  value: '',
};
export const productAttributeInit: IProductAttribute = {
  id: '',
  name: '',
  type: '',
  items: [{ ...productAttributeItemInit }],
};
export interface IAttribute {
  id: string;
  displayValue: string;
  value: string;
}
export const productInit = {
  id: 'xbox-series-s',
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
  prices: [
    {
      amount: 0,
      currency: { symbol: SymbolCurrency.SymbolUsd, label: Label.Usd },
    },
  ],
  brand: '',
};

export interface IProductAttrForPrint extends ICommonAttributeSetProps {
  activeAttributes: IActiveAttrPdp[];
  quantity: number;
  additionalId: string;
}
export const productAttrForPrintInit: IProductAttrForPrint = {
  productID: '',
  attributes: [{ ...productAttributeInit }],
  activeAttributes: [{ ...localActiveAttributesPdpInit }],
  quantity: 0,
  additionalId: '',
};

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

export interface IActiveBasketAttr {
  productId: string;
  activeAttributes: IAttrActive[];
}
export const localActiveAttributesInit: IActiveBasketAttr = {
  productId: 'xbox-series-s',
  activeAttributes: [{ ...localActiveAttributesPdpInit }],
};

export interface IModifiedProducts {
  productID: string;
  id: string;
  type: string; // text, color
  name: string; // "Shoe Size" === attrId
  items: IAttribute[];
  activeItem: string;
}
export const modifiedProductsInit: IModifiedProducts = {
  productID: '',
  id: '',
  type: '', // text, color
  name: '', // "Shoe Size" === attrId
  items: [productAttributeItemInit],
  activeItem: '',
};
export interface IPrice {
  amount: number;
  currency: ICurrency;
}
export const priceInit:IPrice = {
  amount: 0,
  currency: {
    label: Label.Usd,
    symbol: SymbolCurrency.SymbolUsd,
  },
}

export interface ILocalBasket {
  productId: string;
  quantity: number;
  activeAttributes: IAttrActive[];
  attributes?: IProductAttribute[];
  prices?: IPrice[];
}
export const localBasketItemInit: ILocalBasket = {
  productId: '',
  quantity: 0,
  activeAttributes: [{ ...localActiveAttributesPdpInit }],
  attributes: [{...productAttributeInit}],
  prices: [{...priceInit}],
};
export interface ILocalBasketForTotal {
  productId: string;
  quantity: number;
  symbolPrice: SymbolCurrency;
  amount: number;
}
export const localBasketForTotalInit: ILocalBasketForTotal = {
  productId: '',
  quantity: 0,
  symbolPrice: SymbolCurrency.SymbolUsd,
  amount: 0,
};
export interface ILocalCurrency {
  label: Label;
  symbol: SymbolCurrency;
}
export const localCurrencyInit: ILocalCurrency = {
  label: Label.Usd,
  symbol: SymbolCurrency.SymbolUsd,
};
