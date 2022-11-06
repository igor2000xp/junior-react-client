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
  return { cart: state.cart.cart };
};
const mapDispatchToPropsFactory = { renewBasket };
type IProps = Readonly<IMainCartProps>;

class MainCart extends CartAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    return super.componentDidMount();
  }

  render() {
    const localBasket = this.props.cart
      ? this.props.cart
      : [localBasketItemInit];
    if (this.getCount() > 0) {
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
                    basketId={basket.id}
                    currency={currency}
                    key={item.productIdAttr + index}
                  />
                );
              })}
              <MainCartTotalBlock/>
            </section>
          </article>
        </article>
      );
    } else {
      return (
        <article className={`${styles.cartWrapper}`}>
          <Header />
          <h1 className={`${styles.emptyStyle}`}>Your cart is empty</h1>
        </article>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPropsFactory)(MainCart);
