import React, { Component } from 'react';
import styles from './plp-page.module.css';
// import BasicBlock from '../pdp-card/cartBlocks/basic-block';
import '../../../../assets/images/Icon/minus-svgrepo-com.svg';
import CartPage from './cart-page/cart-page';
import TotalBlock from './cart-page/total-block';
import Header from '../../common/header';

class PlpPage extends Component {
  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
  }
  getCurrency(label: string, symbol: string) {
    console.log('Get currency to plp to state');
    console.log(label, symbol);
  }

  render() {
    return (
      <>
        <Header getCurrency={this.getCurrency} />
        <article className={styles.wrapper}>
          <h1>Cart</h1>
          <div className={styles.mainBlock}>
            <CartPage />
            <CartPage />
            <TotalBlock />
          </div>
        </article>
      </>
    );
  }
}

export default PlpPage;
