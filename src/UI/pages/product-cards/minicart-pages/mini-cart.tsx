import React from 'react';
import stylesCart from './mini-cart.module.css';
import CartPage from '../plp-card/cart-page/cart-page';
import MiniBasicBlock from './miniCartBlocks/mini-basic-block';
import MiniButtonBlock from './miniCartBlocks/mini-button-block';

class MiniCart extends CartPage {
  render() {
    return (
      <article className={stylesCart.wrapper}>
        <div className={stylesCart.insideWrapper}>
          <section className={stylesCart.MiniCartHeader}>
            <h3>My Bag,</h3>
            <div>
              <h4>3 items</h4>
            </div>
          </section>

          <MiniBasicBlock />
          <MiniBasicBlock />

          <section className={stylesCart.miniTotal}>
            <div className={stylesCart.miniTotalLeft}>
              <h5>Total</h5>
            </div>
            <div className={stylesCart.miniTotalRight}>
              <h3>$200.00</h3>
            </div>
          </section>

          <MiniButtonBlock />
        </div>
      </article>
    );
  }
}

export default MiniCart;
