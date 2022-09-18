import React, { Component } from 'react';
import stylesCount from './cart-badge.module.css';

export interface CartBadgeProps {
  count: number;
}
export interface ICartBadgeState {
  count: number;
}

type IProps = Readonly<CartBadgeProps>;
type IState = Readonly<ICartBadgeState>

class CartBadge extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    if (prevState.count !== this.props.count) {
      this.setState({
        count: this.props.count,
      })
    }
  }

  render() {
    return (
        <div className={stylesCount.cartBadge}>
          <p>{this.state.count}</p>
        </div>
    );
  }
}

export default CartBadge;
