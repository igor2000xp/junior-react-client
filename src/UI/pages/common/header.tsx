import React, { Component } from 'react';
import stylesHeader from './header.module.css';
import NavigateBlock from './navigate-block';
import client from '../../../graphql/apollo';
import currencyArrowOpen from '../../../assets/images/Icon/currencyOpen.svg';
import currencyArrowClose from '../../../assets/images/Icon/currencyClose.svg';
import {
  GetAllCurrencyDocument,
  GetAllCurrencyQuery,
} from '../../../graphql/generated';
import CurrencyItem from './common-bloks/currency-item/currency-item';
import { LOCAL_CURRENT_CURRENCY } from '../../../constants';

// interface ICurrencies
export interface ICurrency {
  label: Label;
  symbol: SymbolCurrency;
}
interface IState {
  label: Label;
  symbol: SymbolCurrency;
  isShown: boolean;
}
enum Label {
  Usd = 'USD',
  Aud = 'AUD',
  Gbr = 'GBR',
  Jpy = 'JPY',
  Rub = 'RUB',
}
enum SymbolCurrency {
  SymbolUsd = '$',
  SymbolAud = '£',
  SymbolGbr = 'A$',
  SymbolJpy = '¥',
  SymbolRub = '₽',
}
const currencyInit = [
  { label: Label.Usd, symbol: SymbolCurrency.SymbolUsd },
  { label: Label.Gbr, symbol: SymbolCurrency.SymbolGbr },
  { label: Label.Aud, symbol: SymbolCurrency.SymbolAud },
  { label: Label.Jpy, symbol: SymbolCurrency.SymbolJpy },
  { label: Label.Rub, symbol: SymbolCurrency.SymbolRub },
];

interface IProps {
  getCurrency: (label: string, symbol: string) => void;
}

class Header extends Component<IProps, IState> {
  private currencies: ICurrency[];
  public currencyBlockRef = React.createRef<HTMLDivElement>();
  // private currentCurrency: ICurrency;
  // private isShown: boolean;

  constructor(props: any) {
    super(props);
    this.currencies = currencyInit;
    this.state = {
      label: Label.Usd,
      symbol: SymbolCurrency.SymbolUsd,
      isShown: false,
    };
  }

  async componentDidMount() {
    try {
      const currencyResponse = await client.query<GetAllCurrencyQuery>({
        query: GetAllCurrencyDocument,
      });
      this.currencies = currencyResponse.data.currencies as ICurrency[];
      console.log('componentDidMount');
      console.log(this.currencies);
      const currentCurrency = JSON.parse(
        localStorage.getItem(LOCAL_CURRENT_CURRENCY) as string,
      );
      if (!currentCurrency)
        localStorage.setItem(
          LOCAL_CURRENT_CURRENCY,
          JSON.stringify({
            label: this.state.label,
            symbol: this.state.symbol,
          }),
        );
      await this.setState(() => {
        return {
          label: currentCurrency.label,
          symbol: currentCurrency.symbol,
        };
      });
      console.log(currentCurrency);
    } catch (err) {
      console.log(`Server error ${err}`);
    }
  }

  async toggleCurrencyMenu() {
    console.log('toggleCurrencyMenu');
    console.log(this.currencyBlockRef.current?.className);
    await this.setState(() => {
      return this.state.isShown ? { isShown: false } : { isShown: true };
    });
  }

  async closeCurrencyMenu(e: MouseEvent) {
    // if (e.target !== this.currencyBlockRef) console.log('close');
    console.log(e.target);
    await this.setState(() => {
      return { isShown: false };
    });
    console.log('closeCurrencyMenu');
  }

  async handlerClick(currency: ICurrency): Promise<ICurrency> {
    // if (e.target) console.log(e.target);
    console.log('handlerClick');
    this.props.getCurrency(currency.label, currency.symbol);
    this.setState(() => {
      return {
        isShown: false,
        label: currency.label,
        symbol: currency.symbol,
      };
    });
    localStorage.setItem(LOCAL_CURRENT_CURRENCY, JSON.stringify(currency));
    // console.log(shown);
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
                ref={this.currencyBlockRef}
                // onClick={(e) => this.closeCurrencyMenu.bind(e)}
              >
                {this.state.isShown &&
                  this.currencies.map((item, index) => {
                    return (
                      <div key={index} className={stylesHeader.currencyItem}>
                        <CurrencyItem
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
