import { Label, SymbolCurrency } from './common-models';

export interface IHeaderProps {
  getCurrency: (label: Label, symbol: SymbolCurrency) => void;
}
