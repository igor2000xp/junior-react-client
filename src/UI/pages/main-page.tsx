import React, { PureComponent } from 'react';
import client from '../../graphql/apollo';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
} from '../../graphql/generated';
import { ProductSmallCard } from './product-cards/product-small-cart/product-small-card';
import stylesMain from './main-page.module.css';
import { withRouter } from './with-router/with-router';
import { WithRouterProps } from './with-router/with-router.model';
import {
  IItem,
  IParams,
  IPropsMainPage,
  IState,
  itemInit,
  stateInit,
} from './main-page-madel/main-page.model';
import Header from './common/header';
import { LOCAL_CURRENT_CURRENCY } from '../../constants';
import { Label, SymbolCurrency } from './common-models';

class MainPage extends PureComponent<IPropsMainPage, IState> {
  private categoryId: string;
  private printItems: IItem[] | undefined;

  constructor(props: any) {
    super(props);
    this.categoryId = '';
    this.state = { ...stateInit };
    this.printItems = [{ ...itemInit }];
    this.getCurrency = this.getCurrency.bind(this);
  }

  async componentDidMount() {
    const currency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
    const currentCurrency = JSON.parse(currency ? currency : '');
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    await this.checkQueryData();
    this.setState(() => {
      return {
        categoryIdState: this.categoryId,
        currentCurrency: currentCurrency.symbol,
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

  async myQuery(categoryId: string) {
    try {
      return await client.query<GetProductsByCategoryQuery>({
        query: GetProductsByCategoryDocument,
        variables: {
          category: categoryId,
        },
      });
    } catch (err) {
      console.log('Error loading data from server = ', err);
    }
  }

  async checkQueryData() {
    const allData = await this.myQuery(this.categoryId);
    const data = allData ? allData.data : { category: { products: [] } };
    const category = data.category ? data.category : { products: [] };
    this.printItems = category.products.map((item) => {
      return {
        id: item ? item.id : '',
        name: item ? item.name : '',
        brand: item ? item.brand : '',
        gallery: item ? item.gallery : '',
        prices: item
          ? item.prices.map((pr) => {
              return {
                label: pr.currency.label,
                symbol: pr.currency.symbol,
                amount: pr.amount,
              };
            })
          : { label: '', symbol: '', amount: 0 },
      };
    });
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
    const items = this.printItems ? this.printItems : [itemInit];
    const newItems = items.map((item) => {
      return item !== null ? item : itemInit;
    });
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
            {newItems.map((item) => {
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
