import React, { Component, PureComponent } from 'react';
import styles from './main-cart.module.css';
import MainCartItem from './main-cart-item/main-cart-item';
import MainCartTotalBlock from './main-cart-item/main-cart-total-block';
import Header from '../../common/header';
import {
  ICurrency,
  IMainCartProps,
  IMainCartState,
  Label,
  localBasketItemInit,
  SymbolCurrency,
} from '../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../constants';
import { State } from '../../../../store/store';
import { renewBasket } from '../../../../store/cartSlice';
import { connect } from 'react-redux';
import CartAbstractClass from './abstract-classes/CartAbstractClass';

const mapStateToProps = (state: State) => {
  return { cart: state.cart };
};
const mapDispatchToPropsFactory = { renewBasket };

type IProps = Readonly<IMainCartProps>;
type IState = Readonly<IMainCartState>;

class MainCart extends CartAbstractClass {
  // protected localBasket = [localBasketItemInit];
  // protected currentCurrencyLabel = Label.Usd;
  // protected isChangedPlusMinusButtons = false;
  // protected symbol = SymbolCurrency.SymbolUsd;

  constructor(props: IProps) {
    super(props);
    // this.getCurrency = this.getCurrency.bind(this);
    // this.handlePlusMinusButtons = this.handlePlusMinusButtons.bind(this);
    // this.getTotalItemsQuality = this.getTotalItemsQuality.bind(this);
    // this.state = {
    //   productId: 'xbox-series-s',
    //   currentCurrency: SymbolCurrency.SymbolUsd,
    //   localBasket: [localBasketItemInit],
    //   isChanged: false,
    //   isChangedPlusMinusButtons: false,
    //   totalItems: 0,
    // };
  }

  // async componentDidMount() {
  //   this.localBasket = JSON.parse(
  //     (await localStorage.getItem(LOCAL_BASKET)) as string,
  //   );
  //   await this.setState(() => {
  //     return {
  //       localBasket: this.localBasket,
  //     };
  //   });
  //   await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  //   const currency: ICurrency = JSON.parse(
  //     (await localStorage.getItem(LOCAL_CURRENT_CURRENCY)) as string,
  //   );
  //   this.currentCurrencyLabel = currency.label;
  //   this.setState({
  //     currentCurrency: currency.symbol,
  //     isChanged: true,
  //   });
  // }
  //
  // async componentDidUpdate(
  //   prevProps: Readonly<IProps>,
  //   prevState: Readonly<IState>,
  // ) {
  //   this.localBasket = JSON.parse(
  //     (await localStorage.getItem(LOCAL_BASKET)) as string,
  //   );
  //   await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  // }
  //
  // async componentWillUnmount() {
  //   await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  // }
  //
  // async getCurrency(label: Label, symbol: SymbolCurrency) {
  //   await this.setState({
  //     currentCurrency: symbol,
  //   });
  // }
  //
  // handlePlusMinusButtons() {
  //   const isToggle = !this.isChangedPlusMinusButtons;
  //   this.isChangedPlusMinusButtons = isToggle;
  //   const localBasket = JSON.parse(
  //     localStorage.getItem(LOCAL_BASKET) as string,
  //   );
  //   this.setState({ localBasket });
  //   this.setState({ isChangedPlusMinusButtons: isToggle });
  // }
  //
  // protected getTotalItemsQuality(totalItems: number) {
  //   this.setState({ totalItems });
  // }

  render() {
    const localBasket = this.state.localBasket
      ? this.state.localBasket
      : [localBasketItemInit];
    return (
      <article className={styles.cartWrapper}>
        {/*<Header getCurrency={this.getCurrency} />*/}
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
