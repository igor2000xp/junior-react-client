import React, { Component, RefObject } from 'react';
import stylesHeader from './header.module.css';
import NavigateBlock from './navigate-block';
import client from '../../../graphql/apollo';
import {
  GetAllCurrencyDocument,
  GetAllCurrencyQuery,
} from '../../../graphql/generated';
import CurrencyItem from './common-bloks/currency-item/currency-item';
import { LOCAL_CURRENT_CURRENCY } from '../../../constants';
import currencyArrowOpen from '../../../assets/images/Icon/currencyOpen.svg';
import currencyArrowClose from '../../../assets/images/Icon/currencyClose.svg';
import {
  currencyInit,
  ICurrency,
  IHeaderProps,
  IHeaderState,
  Label,
  SymbolCurrency,
  zeroCurrencyInit,
} from '../common-models';

type IState = Readonly<IHeaderState>;
type IProps = Readonly<IHeaderProps>;

class Header extends Component<IProps, IState> {
  private currencies: ICurrency[];
  wrapperRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.currencies = currencyInit;
    this.state = {
      label: Label.Usd,
      symbol: SymbolCurrency.SymbolUsd,
      isShown: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  async handleClickOutside(event: MouseEvent) {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target as Node)
    ) {
      await this.closeCurrencyMenu();
    }
  }

  async componentDidMount() {
    try {
      await this.initFirst();
      document.addEventListener('mousedown', this.handleClickOutside);
      const currencyResponse = await client.query<GetAllCurrencyQuery>({
        query: GetAllCurrencyDocument,
      });
      this.currencies = currencyResponse.data.currencies as ICurrency[];

      // const localCurrentCurrency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
      // let currentCurrency: typeof zeroCurrencyInit;
      // if (!localCurrentCurrency) {
      //   currentCurrency = zeroCurrencyInit;
      //   localStorage.setItem(LOCAL_CURRENT_CURRENCY, JSON.stringify(currentCurrency));
      // } else {
      //   currentCurrency = JSON.parse(localCurrentCurrency);
      // }
      // if (!currentCurrency)
      //   localStorage.setItem(
      //     LOCAL_CURRENT_CURRENCY,
      //     JSON.stringify({
      //       label: this.state.label,
      //       symbol: this.state.symbol,
      //     }),
      //   );
      // await this.setState(() => {
      //   return {
      //     label: currentCurrency.label,
      //     symbol: currentCurrency.symbol,
      //   };
      // });
    } catch (err) {
      console.log(`Server error ${err}`);
    }
  }

  async initFirst() {
    const localCurrentCurrency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
    let currentCurrency: typeof zeroCurrencyInit;
    if (!localCurrentCurrency) {
      currentCurrency = zeroCurrencyInit;
      localStorage.setItem(
        LOCAL_CURRENT_CURRENCY,
        JSON.stringify(currentCurrency),
      );
    } else {
      currentCurrency = JSON.parse(localCurrentCurrency);
    }
    await this.setState(() => {
      return {
        label: currentCurrency.label,
        symbol: currentCurrency.symbol,
      };
    });
  }

  async toggleCurrencyMenu() {
    await this.setState(() => {
      return this.state.isShown ? { isShown: false } : { isShown: true };
    });
  }

  async closeCurrencyMenu() {
    await this.setState(() => {
      return { isShown: false };
    });
  }

  async handlerClick(currency: ICurrency): Promise<ICurrency> {
    this.props.getCurrency(currency.label, currency.symbol);
    await this.setState(() => {
      return {
        isShown: false,
        label: currency.label,
        symbol: currency.symbol,
      };
    });
    localStorage.setItem(LOCAL_CURRENT_CURRENCY, JSON.stringify(currency));
    return currency;
  }

  render() {
    return (
      <div className={stylesHeader.header}>
        <NavigateBlock />
        <div className={stylesHeader.logo} />

        <div className={stylesHeader.basketCorner}>
          <div
            className={stylesHeader.currency}
            onClick={() => this.toggleCurrencyMenu()}
          >
            <div className={stylesHeader.currencyLabel}>
              {`${this.state.symbol}`}
            </div>

            <div className={stylesHeader.currencyArrow}>
              {this.state.isShown ? (
                <img src={currencyArrowOpen} alt="arrow" />
              ) : (
                <img src={currencyArrowClose} alt="arrow" />
              )}
            </div>

            <div
              className={stylesHeader.currencyBlock}
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <div
                className={stylesHeader.currencyDroppingBox}
                ref={this.wrapperRef}
              >
                {this.state.isShown &&
                  this.currencies.map((item, index) => {
                    return (
                      <div key={index} className={stylesHeader.currencyItem}>
                        <CurrencyItem
                          currentLabel={this.state.label}
                          label={item.label}
                          currencySymbol={item.symbol}
                          onClick={() => {
                            return this.handlerClick({
                              label: item.label,
                              symbol: item.symbol,
                            });
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className={stylesHeader.basket} />
        </div>
      </div>
    );
  }
}

export default Header;
