import React from 'react';
import stylesCart from '../mini-cart.module.css';
import { ITotalBlockProps } from '../../../common-models';
import TotalBlockAbstractClass from '../../main-cart/abstract-classes/totalBlockAbstractClass';
import { State } from '../../../../../store/store';
import { connect } from 'react-redux';

type IProps = Readonly<ITotalBlockProps>;

const mapStateToProps = (state:State) => {
  return {
    cart: state.cart.cart,
    currency: state.currency.symbol,
  }
};

class MiniTotalBlock extends TotalBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const totalSum = `${this.props.currency}${this.state.sum.toFixed(2)}`;
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

// export default MiniTotalBlock;
export default connect(mapStateToProps, null)(MiniTotalBlock);
