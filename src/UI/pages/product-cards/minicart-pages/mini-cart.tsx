import React from 'react';
import stylesCart from './mini-cart.module.css';
import MiniCartItem from './miniCartBlocks/mini-cart-item';
import MiniButtonBlock from './miniCartBlocks/mini-button-block';
import PlpCard from '../plp-card/plp-card';
import { ICurrency, localBasketItemInit } from '../../common-models';

class MiniCart extends PlpCard {
  render() {
    const localBasket = this.state.localBasket
      ? this.localBasket
      : [localBasketItemInit];
    return (
      <article className={stylesCart.wrapper}>
        <div className={stylesCart.insideWrapper}>
          <section className={stylesCart.MiniCartHeader}>
            <h3>My Bag,</h3>
            <div>
              <h4>3 items</h4>
            </div>
          </section>

          <section className={stylesCart.mainBlock}>
            {localBasket.map((item, index) => {
              const basket = item;
              const currency: ICurrency = {
                symbol: this.state.currentCurrency,
                label: this.currentCurrencyLabel,
              };
              return (
                <MiniCartItem
                  basket={basket}
                  currency={currency}
                  handlePlusMinusButtons={this.handlePlusMinusButtons}
                  key={item.productId + index}
                />
              );
            })}
          </section>

          <section className={stylesCart.miniTotal}>
            <div className={stylesCart.miniTotalLeft}>
              <h5>Total</h5>
            </div>
            <div className={stylesCart.miniTotalRight}>
              <h3>$200.00</h3>
            </div>
          </section>

          <section>
            <MiniButtonBlock />
          </section>
        </div>
      </article>
    );
  }
}

export default MiniCart;
