import React from 'react';
import stylesCart from '../mini-cart.module.css';
import { ITotalBlockProps, ITotalBlockState } from '../../../common-models';
import TotalBlockAbstractClass from '../../main-cart/abstract-classes/totalBlockAbstractClass';

type IState = Readonly<ITotalBlockState>;
type IProps = Readonly<ITotalBlockProps>;

class MiniTotalBlock extends TotalBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): Promise<void> {
    await super.componentDidUpdate(prevProps, prevState);
      if (typeof this.props.getTotalItemsQuality !== 'undefined') {
        this.props.getTotalItemsQuality(this.state.quantity);
      }
  }

  render() {
    const totalSum = `${this.props.currentCurrency}${this.state.sum}`;
    return (
      <>
        <div className={stylesCart.miniTotalLeft}>
          <h5>Total</h5>
        </div>
        <div className={stylesCart.miniTotalRight}>
          <h3>{totalSum}</h3>
        </div>
      </>
    );
  }
}

export default MiniTotalBlock;
