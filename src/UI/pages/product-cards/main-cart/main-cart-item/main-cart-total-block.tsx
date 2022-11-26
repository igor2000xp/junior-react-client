import React from 'react';
import totalStyle from './main-cart-total-block.module.css';
import { ITotalBlockProps } from '../../../common-models';
import { Link } from 'react-router-dom';
import TotalBlockAbstractClass from '../abstract-classes/totalBlockAbstractClass';
import { State } from '../../../../../store/store';
import { connect } from 'react-redux';

type IProps = Readonly<ITotalBlockProps>;

const mapStateToProps = (state: State) => {
  return {
    cart: state.cart.cart,
    currency: state.currency.symbol,
  };
};

class MainCartTotalBlock extends TotalBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <article className={totalStyle.totalWrapper}>
        <div className={totalStyle.totalSection}>
          <div className={totalStyle.sectionColumns}>
            <section className={totalStyle.leftTotal}>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <div className={totalStyle.totalBold}>
                <p>Total:</p>
              </div>
            </section>
            <section className={totalStyle.rightTotal}>
              <p>{`${this.props.currency}${this.state.vat.toFixed(2)}`}</p>
              <p>{this.state.quantity}</p>
              <p>{`${this.props.currency}${this.state.sum.toFixed(2)}`}</p>
            </section>
          </div>
          <Link to={'/'}>
            <button className={totalStyle.orderButton}>
              <p>Order</p>
            </button>
          </Link>
        </div>
      </article>
    );
  }
}

// export default MainCartTotalBlock;
export default connect(mapStateToProps, null)(MainCartTotalBlock);
