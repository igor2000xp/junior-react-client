import React, { Component } from 'react';
import totalStyle from './total-block.module.css';
import {
  ILocalBasket,
  ILocalCurrency,
  localCurrencyInit,
  SymbolCurrency
} from '../../../common-models';
import { getProductsListFromBasket } from '../../../main-page-helpers/main-page-helpers';
import { LOCAL_CURRENT_CURRENCY, VAT_RATE } from '../../../../../constants';

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
}
export interface ITotal {
  quantity: number;
  sum: number;
  vat: number;
}
export const totalInit = { quantity: 0, sum: 0, vat: 0 }

export interface ITotalBlockProps {
  localBasket: ILocalBasket[];
  currentCurrency: SymbolCurrency;
}
export interface ITotalBlockState {
  quantity: number;
  sum: number;
  vat: number;
}
export const totalBlockStateInit: ITotalBlockState = {
  quantity: 0,
  sum: 0,
  vat: 0,
}
type IState = Readonly<ITotalBlockState>;
type IProps = Readonly<ITotalBlockProps>;

class TotalBlock extends Component<IProps, IState> {
  private localBasketForTotal: ILocalBasketForTotal[] = [localBasketForTotalInit];
  private localCurrency: ILocalCurrency = localCurrencyInit;
  // private total: ITotal = totalInit;

  constructor(props: IProps) {
    super(props);
    this.state = totalBlockStateInit;
  }

  async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    this.localBasketForTotal = await getProductsListFromBasket(this.props.localBasket, this.props.currentCurrency);
    const sumTotal = (this.localBasketForTotal.reduce((acc, item) => {
      return acc + item.quantity * item.amount;
    },0 ));
    const sum = Number(sumTotal.toFixed(2));
    const quantity = this.localBasketForTotal.reduce((acc, item) => {
      return acc + item.quantity;
    },0 );
    const vat = Number((sumTotal * VAT_RATE).toFixed(2));
    if (prevState.sum === this.state.sum) {
      this.setState({
        sum,
        quantity,
        vat,
      });
    }
  }

  componentDidMount() {
    this.localCurrency = JSON.parse(localStorage.getItem(LOCAL_CURRENT_CURRENCY) as string);
  }

  render() {
    return (
      <article className={totalStyle.totalWrapper}>
        <div className={totalStyle.totalSection}>
          <div className={totalStyle.sectionColumns}>
            <section className={totalStyle.leftTotal}>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <div className={totalStyle.totalBold}>
                <p>Total:</p>
              </div>
            </section>
            <section className={totalStyle.rightTotal}>
              <p>{`${this.props.currentCurrency}${this.state.vat}`}</p>
              <p>{this.state.quantity}</p>
              <p>{`${this.props.currentCurrency}${this.state.sum}`}</p>
            </section>
          </div>
          <button className={totalStyle.orderButton}>
            <p>Order</p>
          </button>
        </div>
      </article>
    );
  }
}

export default TotalBlock;
