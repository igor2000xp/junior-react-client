import React, { Component } from 'react';
import styles from './plp-card.module.css';
import '../../../../assets/images/Icon/minus-svgrepo-com.svg';
import CardItem from './card-item/card-item';
import TotalBlock from './card-item/total-block';
import Header from '../../common/header';
import {
  Label,
  localBasketItemInit,
  SymbolCurrency,
} from '../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../constants';

export interface IState {
  productId: string;
  currentCurrency: SymbolCurrency;
}

class PlpCard extends Component<any, IState> {
  private localBasket = [localBasketItemInit];

  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
    this.state = {
      productId: 'xbox-series-s',
      currentCurrency: SymbolCurrency.SymbolUsd,
    };
  }
  getCurrency(label: Label, symbol: SymbolCurrency) {
    this.setState({
      currentCurrency: symbol,
    });
    this.setState(() => {
      return {
        currentCurrency: symbol,
      };
    });
  }

  async componentDidMount() {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    const currency = JSON.parse(
      (await localStorage.getItem(LOCAL_CURRENT_CURRENCY)) as string,
    );
    // this.setState({
    //   productId: this.localBasket[0].productId,
    // });
    this.setState({
      productId: 'xbox-series-s',
      currentCurrency: currency.symbol,
    });
  }

  render() {
    this.localBasket = this.localBasket
      ? this.localBasket
      : [localBasketItemInit];
    return (
      <>
        <Header getCurrency={this.getCurrency} />
        <article className={styles.wrapper}>
          <h1>Cart</h1>
          <div className={styles.mainBlock}>
            {this.localBasket.map((item, index) => {
              const basket = item;
              const currency = this.state.currentCurrency;
              return (
                <CardItem
                  basket={basket}
                  currency={currency}
                  key={item.productId + index}
                />
              );
            })}
            <TotalBlock />
          </div>
        </article>
      </>
    );
  }
}

export default PlpCard;
