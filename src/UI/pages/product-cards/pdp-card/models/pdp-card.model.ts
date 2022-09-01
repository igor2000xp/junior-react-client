import { SymbolCurrency } from '../../../common/models/header.model';

export interface IState {
  isLoaded: boolean;
  bigImage: string;
  currentCurrency: SymbolCurrency;
}
export const stateInit = {
  isLoaded: true,
  bigImage: '',
  currentCurrency: SymbolCurrency.SymbolUsd,
};

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

export interface IAttributeSet {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}
export interface IPrice {
  currency: string;
  amount: number;
}
export interface IAttribute {
  displayValue: string;
  value: string;
  id: string;
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
