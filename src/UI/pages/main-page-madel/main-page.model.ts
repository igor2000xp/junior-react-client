import { WithRouterProps } from '../with-router/with-router.model';

export interface IParams {
  categoryId: string;
}

export type IProps = WithRouterProps<IParams>;

export interface IState {
  error: null;
  isLoaded: boolean;
  items?: [];
  categoryIdState: string;
}
export const stateInit = {
  error: null,
  isLoaded: false,
  categoryIdState: 'all',
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
export interface IPrintInit {
  loading: boolean;
  networkStatus: number;
}
export const printInit = {
  loading: false,
  networkStatus: 0,
};
