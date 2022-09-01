import { SymbolCurrency } from '../../models/header.model';

export interface IProps {
  id: string;
  symbolCurrency: SymbolCurrency;
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
}
