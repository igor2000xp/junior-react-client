import React, { Component } from 'react';
import {
  ICartCountProviderProps,
  ICartCountProviderState,
  ILocalBasket,
  localBasketItemInit,
} from '../../common-models';
import { State } from '../../../../store/store';
import { connect } from 'react-redux';
import { renewBasket } from '../../../../store/cartSlice';

type IProps = Readonly<ICartCountProviderProps>;
type IState = Readonly<ICartCountProviderState>;

const mapStateToProps = (state: State) => {
  return { cart: state.cart.cart };
};
const mapDispatchToProps = { renewBasket };

class CartCountProvider extends Component<IProps, IState> {
  protected localBasket: ILocalBasket[] = [localBasketItemInit];
  constructor(props: IProps) {
    super(props);
    this.state = { count: 0 };
  }

  async componentDidMount() {
    await this.getLocalBasket();
    this.setState({ count: this.getCount() });
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
    if (this.state.count !== this.getCount()) {
      this.getLocalBasket();
      this.setState({ count: this.getCount() });
    }
  }

  getLocalBasket() {
    this.localBasket = this.props.cart;
  }

  getCount(): number {
    return this.props.cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }

  render() {
    const count = this.state.count;
    return <>{this.props.renderCount(count)}</>;
  }
}

// export default CartCountProvider;
export default connect(mapStateToProps, mapDispatchToProps)(CartCountProvider);
