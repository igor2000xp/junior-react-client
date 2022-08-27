import React, { PureComponent } from 'react';
import client from '../../graphql/apollo';
import { Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
} from '../../graphql/generated';
import { ProductSmallCard } from './product-cards/product-small-cart/product-small-card';
import './Page.css';
import { withRouter } from './with-router/with-router';
import { WithRouterProps } from './with-router/with-router.model';
import {
  IParams,
  IProps,
  IState,
  stateInit,
  printInit,
  IPrint,
  IItem,
  itemInit,
} from './main-page-madel/main-page.model';
import Header from './common/header';

class MainPage extends PureComponent<IProps, IState> {
  private print: IPrint;
  private categoryId: string;
  private printItems: IItem[] | undefined;

  constructor(props: any) {
    super(props);
    this.print = { ...printInit };
    this.categoryId = '';
    this.state = { ...stateInit };
    this.printItems = [{ ...itemInit }];
  }

  async componentDidMount() {
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    await this.checkQueryData();
    this.setState(() => {
      return {
        isLoaded: true,
        categoryIdState: this.categoryId,
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
    const queryResult = await client.query<GetProductsByCategoryQuery>({
      query: GetProductsByCategoryDocument,
      variables: {
        category: categoryId,
      },
    });
    this.print = { ...queryResult };
    return queryResult;
  }
  async checkQueryData() {
    const allData = await this.myQuery(this.categoryId);
    this.printItems = allData.data.category?.products.map((item) => {
      return {
        id: item && typeof item !== 'undefined' ? item.id : '',
        name: item != null && typeof item !== 'undefined' ? item.name : '',
        gallery: item && typeof item !== 'undefined' ? item.gallery : '',
        prices:
          item && typeof item !== 'undefined'
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

  render() {
    const items =
      typeof this.printItems !== 'undefined' ? this.printItems : [itemInit];
    const newItems = items.map((item) => {
      return typeof item !== 'undefined' && item !== null ? item : itemInit;
    });
    return (
      <>
        <Header />
        <article className={'mainWrapper'}>
          <h1>{`Category ${String(this.categoryId)}`}</h1>
          <section className={'mainProductSection'}>
            {newItems.map((item) => {
              return (
                <Link to="/pdp" key={item.id}>
                  <ProductSmallCard item={item} key={item.id} />
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
