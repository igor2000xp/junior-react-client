import React, { PureComponent } from 'react';
import equal from 'fast-deep-equal';
import ProductSmallCard from './product-cards/product-small-cart/product-small-card';
import stylesMain from './main-page.module.css';
import { withRouter } from './with-router/with-router';
import { WithRouterProps } from './with-router/with-router.model';
import Header from './common/header';
import { ACTIVE_PRODUCT_ATTRIBUTES, LOCAL_BASKET, LOCAL_CURRENT_CURRENCY } from '../../constants';
import {
  IMainPageState,
  IParams,
  IProduct,
  IPropsMainPage,
  Label,
  localBasketItemInit,
  mainPageStateInit,
  productInit,
  SymbolCurrency,
  zeroCurrencyInit,
} from './common-models';
import { getProductsList } from './main-page-helpers/main-page-helpers';

type IState = Readonly<IMainPageState>;
type IProps = Readonly<IPropsMainPage>;

class MainPage extends PureComponent<IProps, IState> {
  private categoryId: string;
  private products: IProduct[] = [productInit];
  private currentCurrency = zeroCurrencyInit;
  private localBaskets = [localBasketItemInit];

  constructor(props: any) {
    super(props);
    this.categoryId = '';
    this.state = { ...mainPageStateInit };
    this.getCurrency = this.getCurrency.bind(this);
    this.handleGoToProductLink = this.handleGoToProductLink.bind(this);
  }

  async componentDidMount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
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
    await this.getAndCheckQueryData();
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
      await this.getAndCheckQueryData();
    }
  }

  async getAndCheckQueryData() {
    const products = (await getProductsList(this.categoryId)) as IProduct[];
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

  handleGoToProductLink(id: string) {
    this.props.history.push(`/pdp/:${id}`);
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
              const outStock = item.inStock ? '' : `${stylesMain.outStock}`;
              return (
                <section
                  className={`${stylesMain.itemBlock} ${outStock}`}
                  key={item.id}
                >
                  <div onClick={() => this.handleGoToProductLink(item.id)}>
                    <ProductSmallCard
                      item={item}
                      symbolCurrency={symbolCurrency}
                      key={item.id}
                    />
                  </div>
                </section>
              );
            })}
          </section>
        </article>
      </>
    );
  }
}
export default withRouter(MainPage);
