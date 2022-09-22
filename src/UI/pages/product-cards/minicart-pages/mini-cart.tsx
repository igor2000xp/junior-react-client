import React from 'react';
import stylesCart from './mini-cart.module.css';
import MiniCartItem from './miniCartBlocks/mini-cart-item';
import MiniButtonBlock from './miniCartBlocks/mini-button-block';
import PlpCard from '../plp-card/plp-card';
import {
  ICurrency,
  IPlpCardProps,
  localBasketItemInit,
  SymbolCurrency,
} from '../../common-models';
import MiniTotalBlock from './mini-total-block/mini-total-block';
import { LOCAL_BASKET } from '../../../../constants';

type IProps = Readonly<IPlpCardProps>;

class MiniCart extends PlpCard {
  constructor(props: IProps) {
    super(props);
    this.getTotalItemsQuality = this.getTotalItemsQuality.bind(this);
  }
  protected getTotalItemsQuality(totalItems: number) {
    if (this.state.totalItems !== totalItems) {
      this.setState({ totalItems });
    }
  }

  async componentDidUpdate(prevProps: Readonly<IProps>): Promise<void> {
    const isNewCurrency = prevProps.symbol !== this.state.currentCurrency;
    const isNewBasketToggle = prevProps.isNewBasketToggle !== this.props.isNewBasketToggle;
    if (isNewBasketToggle) {
      this.localBasket = JSON.parse(
        (await localStorage.getItem(LOCAL_BASKET)) as string,
      );
      const isChanged = !this.state.isChanged;
      await this.setState({
        isChanged,
        localBasket: this.localBasket,
      });
    }
    if (isNewCurrency) {
      const currentCurrency = this.props.symbol
        ? this.props.symbol
        : SymbolCurrency.SymbolUsd;
      this.setState({ currentCurrency });
    }
  }

  render() {
    const localBasket = this.state.localBasket
      ? this.state.localBasket
      : [localBasketItemInit];
    return (
      <article className={stylesCart.wrapper}>
        <div className={stylesCart.insideWrapper}>
          <section className={stylesCart.MiniCartHeader}>
            <h3>My Bag,</h3>
            <div>
              <h4>{this.state.totalItems} items</h4>
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
            <MiniTotalBlock
              localBasket={this.state.localBasket}
              currentCurrency={this.state.currentCurrency}
              isChangedPlusMinusButtons={this.isChangedPlusMinusButtons}
              getTotalItemsQuality={this.getTotalItemsQuality}
            />
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
