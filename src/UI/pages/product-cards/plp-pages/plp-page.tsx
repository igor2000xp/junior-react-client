import React, { Component } from 'react';
import styles from './plp-page.module.css';
// import BasicBlock from '../pdp-card/cartBlocks/basic-block';
import '../../../../assets/images/Icon/minus-svgrepo-com.svg';
import CartPage from './cart-page/cart-page';
import TotalBlock from './cart-page/total-block';

class PlpPage extends Component {
  render() {
    return (
      <article className={styles.wrapper}>
        <h1>Cart</h1>
        <div className={styles.mainBlock}>
          <CartPage />
          <CartPage />
          <TotalBlock />
        </div>
      </article>
    );
  }
}

export default PlpPage;
