import { WithRouterProps } from '../with-router/with-router.model';
import { SymbolCurrency } from '../common/models/header.model';

export interface IParams {
  categoryId: string;
}

export type IPropsMainPage = WithRouterProps<IParams>;

export interface IState {
  error: null;
  isLoaded: boolean;
  items?: IItem[];
  categoryIdState: string;
  currentCurrency: SymbolCurrency;
}
export const stateInit = {
  error: null,
  isLoaded: false,
  categoryIdState: 'all',
  currentCurrency: SymbolCurrency.SymbolUsd,
};

export interface IItem {
  name: string;
  id: string;
  gallery: Array<string | null> | null | undefined | string;
  brand: string;
  prices: IPrice | IPrice[];
}
export interface IPrice {
  symbol: string;
  amount: number;
  label: string;
}
export const itemInit = {
  id: '',
  name: '',
  gallery: [''],
  brand: '',
  prices: [{ symbol: 'string', amount: 0, label: 'string' }],
  currentCurrency: SymbolCurrency.SymbolUsd,
};
export interface IGetProductsByCategory {
  data: IData;
  loading: boolean;
  networkStatus: number;
}
export interface IData {
  category: ICategory;
}
export interface ICategory {
  name: string;
  products: IProduct[];
}
export interface IProduct {
  id: string;
}
