import React from 'react';
import styles from './main-cart.module.css';
import MainCartItem from './main-cart-item/main-cart-item';
import MainCartTotalBlock from './main-cart-item/main-cart-total-block';
import Header from '../../common/header';
import {
  ICurrency,
  IMainCartProps,
  localBasketItemInit,
} from '../../common-models';
import { State } from '../../../../store/store';
import { renewBasket } from '../../../../store/cartSlice';
import { connect } from 'react-redux';
import CartAbstractClass from './abstract-classes/CartAbstractClass';

const mapStateToProps = (state: State) => {
  return { cart: state.cart };
};
const mapDispatchToPropsFactory = { renewBasket };
type IProps = Readonly<IMainCartProps>;

class MainCart extends CartAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const localBasket = this.state.localBasket
      ? this.state.localBasket
      : [localBasketItemInit];
    return (
      <article className={styles.cartWrapper}>
        <Header />
        <article className={styles.wrapper}>
          <section className={styles.header}>
            <h1>Cart</h1>
          </section>

          <section className={styles.mainBlock}>
            {localBasket.map((item, index) => {
              const basket = item;
              const currency: ICurrency = {
                symbol: this.state.currentCurrency,
                label: this.currentCurrencyLabel,
              };
              return (
                <MainCartItem
                  basket={basket}
                  currency={currency}
                  // handlePlusMinusButtons={this.handlePlusMinusButtons}
                  key={item.productId + index}
                />
              );
            })}
            <MainCartTotalBlock
              isChangedPlusMinusButtons={this.isChangedPlusMinusButtons}
              localBasket={this.state.localBasket}
              currentCurrency={this.state.currentCurrency}
            />
          </section>
        </article>
      </article>
    );
  }
}

// export default MainCart;
export default connect(mapStateToProps, mapDispatchToPropsFactory)(MainCart);
