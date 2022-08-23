import React, { Component, PureComponent } from 'react';
import client from '../../graphql/apollo';
import { Link } from 'react-router-dom';
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
} from '../../graphql/generated';
import { ProductSmallCard } from './product-cards/product-small-cart/product-small-card';
import './Page.css';
import { withRouter, WithRouterProps } from './with-router/with-router';
import equal from 'fast-deep-equal';
import { ApolloQueryResult } from '@apollo/client';

interface IParams {
  categoryId: string;
}

type IProps = WithRouterProps<IParams>;

interface IState {
  error: null;
  isLoaded: boolean;
  items: [];
  categoryIdState: string;
}

interface IGetProductsByCategory {
  data: IData;
  loading: boolean;
  networkStatus: number;
}
interface IData {
  category: ICategory;
}
interface ICategory {
  name: string;
  products: IProduct[];
}
interface IProduct {
  id: string;
}

class TechPage extends PureComponent<IProps, IState> {
  private print: IGetProductsByCategory;
  private categoryId: string;
  constructor(props: any) {
    super(props);
    this.print = {
      loading: false,
      networkStatus: 0,
      data: {
        category: {
          name: '',
          products: Array({
            id: '',
          }),
        },
      },
    };
    console.log('tech cat');
    this.categoryId = 'all';
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      categoryIdState: 'all',
    };
  }

  // shouldComponentUpdate(nextProps: IProps){
  //  const { match } = nextProps;
  //  const arrayIdString = match.params.categoryId.split(':');
  //
  //   return arrayIdString[1] !== this.state.categoryId;
  // }

  async componentDidMount() {
    console.log('componentDidMount');
    // interface IGetProductsByCategory {
    //   data: IData;
    //   loading: boolean;
    //   networkStatus: number;
    // }
    // const { useParams } = this.props;
    // const { id } = this.props.params;
    // const id = this.props.match.params;
    const { match } = this.props;
    const arrayIdString = match.params.categoryId.split(':');
    this.categoryId = arrayIdString[1];
    console.log(this.categoryId);
    // console.log(match.params.categoryId); // with autocomplete

    this.print = await client.query({
      query: GetProductsByCategoryDocument,
      variables: {
        category: this.categoryId,
      },
    });

    // this.print = await this.myQuery(this.categoryId)

    // this.setState({
    //   isLoaded: true,
    //   items: this.print,
    //   categoryIdState: this.categoryId,
    // });
    this.setState((state, props) => {
      const { match } = props;
      const arrayIdString = match.params.categoryId.split(':');
      this.categoryId = arrayIdString[1];
      return {
        // counter: state.counter + props.step
        isLoaded: true,
        items: [],
        categoryIdState: this.categoryId,
      };
    });

    // .then((res) => res)
    // .then((result) => {
    //   this.setState({
    //     isLoaded: true,
    //     items: result.data.category,
    //   });
    // });
    console.log(this.state);
    console.log(this.print);
    console.log(this.print.data.category.products[0].id);
  }

  async componentDidUpdate(prevProps: WithRouterProps<IParams>) {
    const { match } = this.props;
    const arrayIdString = match.params.categoryId.split(':');
    this.categoryId = arrayIdString[1];
    if (!equal(prevProps.match.params.categoryId, `:${this.categoryId}`)) {
      // this.render();
      console.log(this.categoryId);
      console.log(prevProps.match.params.categoryId);

      this.print = await client.query({
        query: GetProductsByCategoryDocument,
        variables: {
          category: this.categoryId,
        },
      });
      console.log(this.print);
    }
  }

  async myQuery(categoryId: string) {
    return await client.query<GetProductsByCategoryQuery>({
      query: GetProductsByCategoryDocument,
      variables: {
        category: categoryId,
      },
    });
  }

  render() {
    return (
      <>
        <article>
          <h1>{`Tech category page ${String(this.categoryId)}`}</h1>
          {/*<p>{this.myQuery()}</p>*/}
          <Link to="/pdp">
            <ProductSmallCard />
          </Link>
        </article>
      </>
    );
  }
}

// export default TechPage;
export default withRouter(TechPage);
