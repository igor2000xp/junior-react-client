import React from 'react';
import TotalBlock from '../../plp-card/card-item/total-block';
import stylesCart from '../mini-cart.module.css';
import { ITotalBlockProps, ITotalBlockState } from '../../../common-models';

type IProps = Readonly<ITotalBlockProps>;
type IState = Readonly<ITotalBlockState>;

class MiniTotalBlock<ITotalBlockProps, ITotalBlockState> extends TotalBlock<
  ITotalBlockProps,
  IState
> {
  constructor(props: IProps) {
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
