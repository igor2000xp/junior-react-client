import React, { Component } from 'react';
import styles from './plp-card.module.css';
import '../../../../assets/images/Icon/minus-svgrepo-com.svg';
import CardItem from './card-item/card-item';
import TotalBlock from './card-item/total-block';
import Header from '../../common/header';
import {
  ICurrency,
  ILocalBasket,
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
  localBasket: ILocalBasket[];
  isChanged: boolean;
}

class PlpCard extends Component<any, IState> {
  private localBasket = [localBasketItemInit];
  private currentCurrencyLabel = Label.Usd;

  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
    this.state = {
      productId: 'xbox-series-s',
      currentCurrency: SymbolCurrency.SymbolUsd,
      localBasket: [localBasketItemInit],
      isChanged: false,
    };
  }
  getCurrency(label: Label, symbol: SymbolCurrency) {
    this.setState({
      currentCurrency: symbol,
    });
  }

  async componentDidMount () {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await this.setState(() => {
      return {
        localBasket: this.localBasket,
      }
    });
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    const currency: ICurrency = JSON.parse(
      (await localStorage.getItem(LOCAL_CURRENT_CURRENCY)) as string,
    );
    this.currentCurrencyLabel = currency.label;
    this.setState({
      currentCurrency: currency.symbol,
      isChanged: true,
    });
  }

  async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<IState>, snapshot?: any) {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    console.log(this.localBasket);
    // if (prevState.isChanged !== this.state.isChanged) {
    //   await this.setState({
    //     isChanged: false,
    //   });
    // }
  }

  render() {
    const localBasket = this.state.localBasket
      ? this.localBasket
      : [localBasketItemInit];
    return (
      <>
        <Header getCurrency={this.getCurrency} />
        <article className={styles.wrapper}>
          <h1>Cart</h1>
          <div className={styles.mainBlock}>
            {localBasket.map((item, index) => {
              const basket = item;
              const currency: ICurrency = { symbol: this.state.currentCurrency, label: this.currentCurrencyLabel};
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
