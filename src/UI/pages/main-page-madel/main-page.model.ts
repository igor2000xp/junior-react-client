import { WithRouterProps } from '../with-router/with-router.model';

export interface IParams {
  categoryId: string;
}

export type IProps = WithRouterProps<IParams>;

export interface IState {
  error: null;
  isLoaded: boolean;
  items?: IItem[];
  categoryIdState: string;
}
export const stateInit = {
  error: null,
  isLoaded: false,
  categoryIdState: 'all',
};
export interface IPrint {
  loading: boolean;
  networkStatus: number;
}
export const printInit = {
  loading: false,
  networkStatus: 0,
};
export interface IItem {
  name: string;
  id: string;
  gallery: Array<string | null> | null | undefined | string;
  prices:
    | { symbol: string; amount: number; label: string }[]
    | { symbol: string; amount: number; label: string };
}
export const itemInit = {
  id: '',
  name: '',
  gallery: [''],
  prices: [{ symbol: 'string', amount: 0, label: 'string' }],
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
