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
  // IGetProductsByCategory,
  IParams,
  IProps,
  IState,
  stateInit,
  printInit,
  IPrintInit,
} from './main-page-madel/main-page.model';

class MainPage extends PureComponent<IProps, IState> {
  private print: IPrintInit;
  private categoryId: string;
  constructor(props: any) {
    super(props);
    this.print = { ...printInit };
    this.categoryId = '';
    this.state = { ...stateInit };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    this.setState(() => {
      return {
        isLoaded: true,
        categoryIdState: this.categoryId,
      };
    });
  }

  async componentDidUpdate(prevProps: WithRouterProps<IParams>) {
    console.log('componentDidUpdate');
    const { match } = this.props;
    this.categoryId = match.params.categoryId.split(':')[1];
    if (!equal(prevProps.match.params.categoryId, `:${this.categoryId}`)) {
      console.log(this.categoryId);
      const allData = await this.myQuery(this.categoryId);
      console.log(allData.data.category?.products);
      this.setState(() => {
        return {
          categoryIdState: this.categoryId,
        };
      });
    }
  }

  async myQuery(categoryId: string) {
    const queryResult = await client.query<GetProductsByCategoryQuery>({
      query: GetProductsByCategoryDocument,
      variables: {
        category: categoryId,
      },
    });
    console.log(queryResult);
    this.print = { ...queryResult };
    console.log(this.print);
    return queryResult;
  }

  render() {
    return (
      <>
        <article className={'mainWrapper'}>
          <h1>{`Category ${String(this.categoryId)}`}</h1>
          <Link to="/pdp">
            <ProductSmallCard />
          </Link>
        </article>
      </>
    );
  }
}

// export default MainPage;
export default withRouter(MainPage);
