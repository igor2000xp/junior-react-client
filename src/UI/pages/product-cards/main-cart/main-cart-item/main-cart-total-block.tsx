import React  from 'react';
import totalStyle from './main-cart-total-block.module.css';
import {
  ITotalBlockProps,
} from '../../../common-models';
import { Link } from 'react-router-dom';
import TotalBlockAbstractClass from '../abstract-classes/totalBlockAbstractClass';

type IProps = Readonly<ITotalBlockProps>;

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
              <p>{`${this.props.currentCurrency}${this.state.vat}`}</p>
              <p>{this.state.quantity}</p>
              <p>{`${this.props.currentCurrency}${this.state.sum}`}</p>
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

export default MainCartTotalBlock;
