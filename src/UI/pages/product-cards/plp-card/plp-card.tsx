import React, { Component } from 'react';
import styles from './plp-card.module.css';
import CardItem from './card-item/card-item';
import TotalBlock from './card-item/total-block';
import Header from '../../common/header';
import {
  ICurrency,
  IPlpCardProps,
  IPlpCardState,
  Label,
  localBasketItemInit,
  SymbolCurrency,
} from '../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../constants';

type IProps = Readonly<IPlpCardProps>;
type IState = Readonly<IPlpCardState>;

class PlpCard extends Component<IProps, IState> {
  protected localBasket = [localBasketItemInit];
  protected currentCurrencyLabel = Label.Usd;
  protected isChangedPlusMinusButtons = false;
  protected symbol = SymbolCurrency.SymbolUsd;

  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
    this.handlePlusMinusButtons = this.handlePlusMinusButtons.bind(this);
    this.getTotalItemsQuality = this.getTotalItemsQuality.bind(this);
    this.state = {
      productId: 'xbox-series-s',
      currentCurrency: SymbolCurrency.SymbolUsd,
      localBasket: [localBasketItemInit],
      isChanged: false,
      isChangedPlusMinusButtons: false,
      totalItems: 0,
    };
  }

  async componentWillUnmount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  async getCurrency(label: Label, symbol: SymbolCurrency) {
    await this.setState({
      currentCurrency: symbol,
    });
  }

  async componentDidMount() {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await this.setState(() => {
      return {
        localBasket: this.localBasket,
      };
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

  async componentDidUpdate(prevProps: Readonly<IProps>) {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  handlePlusMinusButtons() {
    const isToggle = !this.isChangedPlusMinusButtons;
    this.isChangedPlusMinusButtons = isToggle;
    this.setState({ isChangedPlusMinusButtons: isToggle });
  }

  protected getTotalItemsQuality(totalItems: number) {
    this.setState({ totalItems });
  }

  render() {
    const localBasket = this.state.localBasket
      ? this.localBasket
      : [localBasketItemInit];
    return (
      <article className={styles.cartWrapper}>
        <Header getCurrency={this.getCurrency} />
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
                <CardItem
                  basket={basket}
                  currency={currency}
                  handlePlusMinusButtons={this.handlePlusMinusButtons}
                  key={item.productId + index}
                />
              );
            })}
            <TotalBlock
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

export default PlpCard;
