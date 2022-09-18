import React from 'react';
import TotalBlock from '../../plp-card/card-item/total-block';
import stylesCart from '../mini-cart.module.css';
import { ITotalBlockProps } from '../../../common-models';

type IProps = Readonly<ITotalBlockProps>;

class MiniTotalBlock extends TotalBlock {
  constructor(props: IProps) {
    super(props);
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
    )
  }
}

export default MiniTotalBlock;
