import React, { Component } from 'react';
import {
  ICartCountProviderProps,
  ICartCountProviderState,
  ILocalBasket,
  localBasketItemInit,
} from '../../common-models';
import { LOCAL_BASKET } from '../../../../constants';

type IProps = Readonly<ICartCountProviderProps>;
type IState = Readonly<ICartCountProviderState>;

class CartCountProvider extends Component<IProps, IState> {
  protected localBasket: ILocalBasket[] = [localBasketItemInit];
  constructor(props: IProps) {
    super(props);
    this.state = { count: 0 };
  }

  async getLocalBasket() {
    this.localBasket = JSON.parse(localStorage.getItem(LOCAL_BASKET) as string);
  }
  async componentDidMount() {
    await this.getLocalBasket();
    await this.getCount();
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (
      prevState.count !== this.state.count ||
      prevProps.isChangedQuantity !== this.props.isChangedQuantity
    ) {
      await this.getLocalBasket();
      await this.getCount();
    }
  }

  async getCount() {
    const count = this.localBasket.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    await this.setState({ count });
  }

  render() {
    const count = this.state.count;
    return <>{this.props.renderCount(count)}</>;
  }
}

export default CartCountProvider;
