import React, { PureComponent } from 'react';
import equal from 'fast-deep-equal';
import ProductSmallCard from './product-cards/product-small-cart-item/product-small-card';
import stylesMain from './main-page.module.css';
import { withRouter } from './with-router/with-router';
import { WithRouterProps } from './with-router/with-router.model';
import Header from './common/header';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
  PRODUCT_LIST_FIRST_ID,
} from '../../constants';
import {
  ILocalBasket,
  IMainPageState,
  IParams,
  IProduct,
  Label,
  localBasketItemInit,
  mainPageStateInit,
  productInit,
  SymbolCurrency,
  zeroCurrencyInit,
} from './common-models';
import { getProductsList } from './main-page-helpers/main-page-helpers';
import { State } from '../../store/store';
import { setPage } from '../../store/pagesSlice';
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => {
  return { page: state.pages.page };
};
const mapDispatchToProps = { setPage };

type IState = Readonly<IMainPageState>;
// type IProps = Readonly<IPropsMainPage>;

class MainPage extends PureComponent<any, IState> {
  private categoryId: string;
  private products: IProduct[] = [productInit];
  private currentCurrency = zeroCurrencyInit;
  private localBaskets: ILocalBasket[] = [localBasketItemInit];
  private productsListFirstId = '';

  constructor(props: any) {
    super(props);
    this.categoryId = '';
    this.state = { ...mainPageStateInit };
    this.getCurrency = this.getCurrency.bind(this);
    this.handleGoToProductLink = this.handleGoToProductLink.bind(this);
    this.handleGreenButtonFromSmallCart =
      this.handleGreenButtonFromSmallCart.bind(this);
  }

  async componentDidMount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    const currency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
    this.currentCurrency = JSON.parse(
      // currency ? currency : JSON.stringify(zeroCurrencyInit),
      // currency || JSON.stringify(zeroCurrencyInit),
      currency ? JSON.parse(currency) : zeroCurrencyInit,
    );
    const isInit = await localStorage.getItem(LOCAL_BASKET);
    if (!isInit) {
      await localStorage.setItem(
        LOCAL_BASKET,
        JSON.stringify(this.localBaskets),
      );
    } else {
      this.localBaskets = JSON.parse(isInit as string);
    }
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    this.props.setPage(this.categoryId);
    await this.getAndCheckQueryProductsData();
    this.productsListFirstId = this.products[0].id;
    localStorage.setItem(PRODUCT_LIST_FIRST_ID, this.productsListFirstId);
    this.setState(() => {
      return {
        categoryIdState: this.categoryId,
        currentCurrency: this.currentCurrency.symbol,
      };
    });
  }

  async componentDidUpdate(
    prevProps: WithRouterProps<IParams>,
    prevState: IState,
  ) {
    this.categoryId = this.props.page;
    if (!equal(prevProps.match.params.categoryId, `:${this.categoryId}`)) {
      await this.getAndCheckQueryProductsData();
    }
  }

  async getAndCheckQueryProductsData() {
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
      return { currentCurrency: symbol };
    });
  }

  handleGoToProductLink(id: string) {
    this.props.history.push(`/pdp/:${id}`);
  }
  handleGreenButtonFromSmallCart() {
    const toggleState = !this.state.isNewBasketToggle;
    this.setState({ isNewBasketToggle: toggleState });
  }

  render() {
    const items = this.products;
    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <article className={stylesMain.mainWrapper}>
          <Header
            getCurrency={this.getCurrency}
            isNewBasketToggle={this.state.isNewBasketToggle}
          />
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
                      key={item.id}
                      handleGreenButtonFromSmallCart={
                        this.handleGreenButtonFromSmallCart
                      }
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
// export default withRouter(MainPage);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MainPage));
