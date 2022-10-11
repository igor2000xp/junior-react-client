import React, { Component } from 'react';
import stylesCount from './cart-badge.module.css';
import { ICartBadgeProps, ICartBadgeState } from '../../common-models';

type IProps = Readonly<ICartBadgeProps>;
type IState = Readonly<ICartBadgeState>;

class CartBadge extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { count: 0 };
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (prevState.count !== this.props.count) {
      this.setState({ count: this.props.count });
    }
  }

  render() {
    const inActive = !this.state.count ? stylesCount.badgeInActive : '';
    return (
      <div className={stylesCount.basket}>
        <div className={`${stylesCount.cartBadge} ${inActive}`}>
          <p>{this.state.count}</p>
        </div>
      </div>
    );
  }
}

export default CartBadge;
