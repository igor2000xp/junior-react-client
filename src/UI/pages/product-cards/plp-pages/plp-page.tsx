import React, { Component } from 'react';
import styles from './plp-page.module.css';
// import BasicBlock from '../pdp-card/cartBlocks/basic-block';
import '../../../../assets/images/Icon/minus-svgrepo-com.svg';
import CartPage from './cart-page/cart-page';
import TotalBlock from './cart-page/total-block';
import Header from '../../common/header';
import {
  ICurrency,
  ILocalBasket,
  Label,
  localBasketItemInit,
  SymbolCurrency,
} from '../../common-models';
import { LOCAL_BASKET } from '../../../../constants';

export interface IState {
  productId: string;
  currentCurrency: SymbolCurrency;
}

class PlpPage extends Component<any, IState> {
  // private localBasket = localBasketItemInit;
  private localBasket = [localBasketItemInit];
  // private currency: ICurrency = {
  //   label: Label.Usd,
  //   symbol: SymbolCurrency.SymbolUsd,
  // };

  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
    this.state = {
      productId: '',
      currentCurrency: SymbolCurrency.SymbolUsd,
    };
  }
  getCurrency(label: Label, symbol: SymbolCurrency) {
    this.setState({
      currentCurrency: symbol,
    });
  }

  async componentDidMount() {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    this.setState({
      productId: this.localBasket[0].productId,
    });
    // console.log(this.localBasket);
  }

  render() {
    return (
      <>
        <Header getCurrency={this.getCurrency} />
        <article className={styles.wrapper}>
          <h1>Cart</h1>
          <div className={styles.mainBlock}>
            {this.localBasket.map((item) => {
              // console.log(item);
              const basket = item;
              const currency = this.state.currentCurrency;
              // const props = {
              //   basket: item,
              //   currency: this.currency,
              // }
              // console.log(props);
              return (
                <CartPage
                  basket={basket}
                  currency={currency}
                  key={item.productId}
                />
              );
            })}
            {/*<CartPage />*/}
            {/*<CartPage />*/}
            <TotalBlock />
          </div>
        </article>
      </>
    );
  }
}

export default PlpPage;
