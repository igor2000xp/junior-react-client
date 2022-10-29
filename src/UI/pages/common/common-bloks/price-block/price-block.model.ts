import { IPrice, SymbolCurrency } from '../../../common-models';

export interface IPriceBlockProps {
  id?: string;
  prices?: IPrice[];
  symbolCurrency?: SymbolCurrency;
  symbol?: SymbolCurrency;
  isEmpty?: boolean;
}
export interface ISlimPrice {
  symbol: SymbolCurrency;
  amount: number;
}
export interface IPriceBlockState {
  symbol: string;
  amount: number;
  // prodId: string;
}
