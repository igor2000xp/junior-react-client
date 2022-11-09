import React, { Component } from 'react';
import {
  IPriceBlockProps,
  IPriceBlockState,
  SymbolCurrency,
} from '../../../common-models';

type IProps = Readonly<IPriceBlockProps>;
type IState = Readonly<IPriceBlockState>;

class PriceBlockAbstractClass extends Component<IProps, IState> {
  protected isPropsFirst = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      symbol: SymbolCurrency.SymbolUsd,
      amount: 0,
    };
  }

  componentDidMount() {
    const symbol = this.props.symbol
      ? this.props.symbol
      : SymbolCurrency.SymbolUsd;
    const objAmount = this.props.prices?.find((item) => {
      return item.currency.symbol === symbol ? item : 0;
    });
    const amount = objAmount ? objAmount.amount : 0;
    this.setState({ symbol, amount });
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ) {
    const symbol = this.props.symbol
      ? this.props.symbol
      : SymbolCurrency.SymbolUsd;
    const objAmount = this.props.prices?.find((item) => {
      return item.currency.symbol === symbol ? item : 0;
    });
    const amount = objAmount ? objAmount.amount : 0;
    if (
      typeof this.props.prices !== 'undefined' &&
      this.props.prices[0].amount !== 0 &&
      this.isPropsFirst
    ) {
      if (amount !== 0) this.isPropsFirst = false;
      this.setState({ symbol, amount });
    }
    if (prevState.symbol !== symbol) {
      this.setState({ symbol, amount });
    }
  }

  render() {
    return <></>;
  }
}

export default PriceBlockAbstractClass;
