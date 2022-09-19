import React from 'react';
import TotalBlock from '../../plp-card/card-item/total-block';
import stylesCart from '../mini-cart.module.css';
import { ITotalBlockProps, ITotalBlockState } from '../../../common-models';

class MiniTotalBlock extends TotalBlock<ITotalBlockProps, ITotalBlockState> {
  constructor(props: ITotalBlockProps) {
    super(props);
  }

  async componentDidUpdate(prevProps: any, prevState: any) {
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
