import { SymbolCurrency } from '../../../common-models';

export interface IProps {
  id: string;
  symbolCurrency: SymbolCurrency;
  isEmpty?: boolean;
}
export interface IPrice {
  currency: { label: string; symbol: string };
  amount: number;
}
export interface ISlimPrice {
  symbol: string;
  amount: number;
}
export interface IState {
  symbol: string;
  amount: number;
  prodId: string;
}
