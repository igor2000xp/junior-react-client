import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import { ProductSmallCard } from './product-cards/product-small-cart/product-small-card';
import stylesMain from './main-page.module.css';
import { withRouter } from './with-router/with-router';
import { WithRouterProps } from './with-router/with-router.model';
import Header from './common/header';
import { LOCAL_BASKET, LOCAL_CURRENT_CURRENCY } from '../../constants';
import {
  IMainPageState,
  IParams, IProduct,
  IPropsMainPage,
  Label,
  localBasketItemInit,
  mainPageStateInit, productInit,
  SymbolCurrency,
  zeroCurrencyInit,
} from './common-models';
import { getProductsList } from './main-page-helpers/main-page-helpers';

type IState = Readonly<IMainPageState>;

class MainPage extends PureComponent<IPropsMainPage, IState> {
  private categoryId: string;
  private products: IProduct[] = [productInit];
  private currentCurrency = zeroCurrencyInit;
  private localBaskets = [localBasketItemInit];

  constructor(props: any) {
    super(props);
    this.categoryId = '';
    this.state = { ...mainPageStateInit };
    this.getCurrency = this.getCurrency.bind(this);
  }

  async componentDidMount() {
    const currency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
    this.currentCurrency = JSON.parse(
      currency ? currency : JSON.stringify(zeroCurrencyInit),
    );
    const isInit = await localStorage.getItem(LOCAL_BASKET);
    if (!isInit) {
      await localStorage.setItem(
        LOCAL_BASKET,
        JSON.stringify(this.localBaskets),
      );
    }
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    await this.checkQueryData();
    this.setState(() => {
      return {
        categoryIdState: this.categoryId,
        currentCurrency: this.currentCurrency.symbol,
      };
    });
  }

  async componentDidUpdate(prevProps: WithRouterProps<IParams>) {
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    if (!equal(prevProps.match.params.categoryId, `:${this.categoryId}`)) {
      await this.checkQueryData();
    }
  }

  async checkQueryData() {
    const products = await getProductsList(this.categoryId) as IProduct[];
    this.products = products ? products : [productInit];
    this.setState(() => {
      return {
        isLoaded: true,
        categoryIdState: this.categoryId,
      };
    });
  }

  async getCurrency(label: Label, symbol: SymbolCurrency) {
    await this.setState(() => {
      return {
        currentCurrency: symbol,
      };
    });
  }

  render() {
    const items = this.products;
    const symbolCurrency = this.state.currentCurrency;
    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <article className={stylesMain.mainWrapper}>
          <Header getCurrency={this.getCurrency} />
          <h1>{`Category ${String(this.categoryId)}`}</h1>
          <section className={stylesMain.mainProductSection}>
            {items.map((item) => {
              return (
                <Link
                  to={`/pdp/:${item.id}`}
                  key={item.id}
                  className={stylesMain.mainLink}
                >
                  <ProductSmallCard
                    item={item}
                    symbolCurrency={symbolCurrency}
                    key={item.id}
                  />
                </Link>
              );
            })}
          </section>
        </article>
      </>
    );
  }
}
export default withRouter(MainPage);
