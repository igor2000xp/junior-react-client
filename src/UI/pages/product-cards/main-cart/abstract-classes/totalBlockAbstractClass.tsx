import React, { Component } from 'react';
import {
  ILocalBasket,
  ILocalBasketForTotal,
  ITotalBlockProps,
  ITotalBlockState,
  localBasketItemInit,
  SymbolCurrency,
  totalBlockStateInit,
} from '../../../common-models';
import {
  getProductsListFromBasket,
  getTotalItems,
} from '../../../main-page-helpers/main-page-helpers';

type IState = Readonly<ITotalBlockState>;
type IProps = Readonly<ITotalBlockProps>;

class TotalBlockAbstractClass extends Component<IProps, IState> {
  protected localBasket: ILocalBasket[] = [localBasketItemInit];
  constructor(props: IProps) {
    super(props);
    this.state = totalBlockStateInit;
  }

  componentDidMount() {
    const currency = this.props.currency
      ? this.props.currency
      : SymbolCurrency.SymbolUsd;
    const basket = this.props.cart ? this.props.cart : [localBasketItemInit];
    const localBasketForTotal: ILocalBasketForTotal[] =
      getProductsListFromBasket(basket, currency);
    const { sum, quantity, vat } = getTotalItems(localBasketForTotal);
    this.setState({ sum, quantity, vat });
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    const localBasket = this.props.cart;
    this.localBasket = localBasket ? localBasket : [localBasketItemInit];
    const currency = this.props.currency
      ? this.props.currency
      : SymbolCurrency.SymbolUsd;
    const localBasketForTotal: ILocalBasketForTotal[] =
      getProductsListFromBasket(this.localBasket, currency);
    const { sum, quantity, vat } = getTotalItems(localBasketForTotal);
    if (prevState.sum !== sum || prevState.quantity !== quantity) {
      this.setState({ sum, quantity, vat });
    }
  }

  render() {
    return <></>;
  }
}

export default TotalBlockAbstractClass;
