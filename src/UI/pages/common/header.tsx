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
} from '../common-models';
import CartBadge from './cart-badge/cart-badge';
import CartCountProvider from './cart-count-provider/cart-count-provider';
import MiniCart from '../product-cards/minicart-pages/mini-cart';
import { initFirstLocalCurrency } from '../main-page-helpers/main-page-helpers';
import { connect } from 'react-redux';
import { State } from '../../../store/store';
import { setCurrency } from '../../../store/currencySlice';

type IState = Readonly<IHeaderState>;
type IProps = Readonly<IHeaderProps>;

const mapStateToProps = (state: State) => {
  return { symbol: state.currency.symbol };
};
const mapDispatchToProps = { setCurrency };

class Header extends Component<IProps, IState> {
  private currencies: ICurrency[];
  private activeCart = '';
  protected wrapperCurrencyRef: RefObject<HTMLDivElement>;
  protected wrapperCartRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.currencies = currencyInit;
    this.state = {
      label: Label.Usd,
      symbol: SymbolCurrency.SymbolUsd,
      isShownCurrency: false,
      isShownCart: false,
      isNewBasketToggle: false,
    };
    this.wrapperCurrencyRef = React.createRef();
    this.wrapperCartRef = React.createRef();
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleClickOutsideCart = this.handleClickOutsideCart.bind(this);
    this.handleClickOutsideCurrency =
      this.handleClickOutsideCurrency.bind(this);
  }

  async handleClickOutsideCurrency(event: MouseEvent) {
    if (
      this.wrapperCurrencyRef.current &&
      !this.wrapperCurrencyRef.current.contains(event.target as Node) &&
      !this.state.isShownCart
    ) {
      await this.closeCurrencyMenu();
    }
  }

  handleClickOutsideCart(event: MouseEvent) {
    if (
      this.wrapperCartRef.current &&
      !this.wrapperCartRef.current.contains(event.target as Node)
    ) {
      this.closeCart();
    }
  }

  async componentDidMount() {
    try {
      document.addEventListener('mousedown', this.handleClickOutsideCurrency);
      document.addEventListener('mousedown', this.handleClickOutsideCart);
      const { label, symbol } = await initFirstLocalCurrency();
      this.setState({ label, symbol });
      this.props.setCurrency(symbol);
      const { data } = await client.query<GetAllCurrencyQuery>({
        query: GetAllCurrencyDocument,
      });
      this.currencies = data.currencies as ICurrency[];
    } catch (err) {
      console.log(`Error loading data from server ${err}`);
    }
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ) {
    if (prevProps.isNewBasketToggle !== this.props.isNewBasketToggle) {
      const isNewBasketToggle = !this.state.isNewBasketToggle;
      this.setState({ isNewBasketToggle });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideCurrency);
    document.removeEventListener('mousedown', this.handleClickOutsideCart);
  }

  async toggleCurrencyMenu() {
    const isShownCurrency = !this.state.isShownCurrency;
    this.setState({ isShownCurrency });
  }

  closeCurrencyMenu() {
    this.setState({ isShownCurrency: false });
  }

  async handleCurrencyClick(currency: ICurrency): Promise<ICurrency> {
    this.props.getCurrency(currency.label, currency.symbol);
    await this.setState(() => {
      return {
        isShownCurrency: false,
        label: currency.label,
        symbol: currency.symbol,
      };
    });
    this.props.setCurrency(currency.symbol);
    localStorage.setItem(LOCAL_CURRENT_CURRENCY, JSON.stringify(currency));
    return currency;
  }

  handleCartClick() {
    const isShownCart = !this.state.isShownCart;
    this.activeCart = isShownCart ? stylesHeader.activeCart : '';
    this.setState({ isShownCart });
  }
  closeCart() {
    this.activeCart = '';
    this.setState({ isShownCart: false });
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
              {/*{`${this.state.symbol}`}*/}
              {this.props.symbol}
            </div>

            <div className={stylesHeader.currencyArrow}>
              {this.state.isShownCurrency ? (
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
                ref={this.wrapperCurrencyRef}
              >
                {this.state.isShownCurrency &&
                  this.currencies.map((item, index) => {
                    return (
                      <div key={index} className={stylesHeader.currencyItem}>
                        <CurrencyItem
                          currentLabel={this.state.label}
                          label={item.label}
                          currencySymbol={item.symbol}
                          onClick={() => {
                            return this.handleCurrencyClick({
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

          <section className={stylesHeader.miniCartBlockWrapper}>
            <div onClick={this.handleCartClick}>
              <CartCountProvider
                renderCount={(count) => <CartBadge count={count} />}
                isChangedQuantityToggle={this.state.isShownCart}
                isChangedCurrencyOrCart={this.state.isNewBasketToggle}
              />
            </div>

            <div
              className={`${stylesHeader.miniCartBlock} ${this.activeCart}`}
              ref={this.wrapperCartRef}
            >
              <MiniCart
                symbol={this.state.symbol}
                isNewBasketToggle={this.state.isNewBasketToggle}
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// export  default Header;
export default connect(mapStateToProps, mapDispatchToProps)(Header);
