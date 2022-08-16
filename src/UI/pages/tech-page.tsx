import React, { Component } from 'react';
import client from '../../graphql/apollo';
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
} from '../../graphql/generated';
import { ProductSmallCard } from './cart-page/product-small-card';

class TechPage extends Component {
  async myQuery() {
    return await client.query<GetProductsByCategoryQuery>({
      query: GetProductsByCategoryDocument,
      variables: {
        category: 'all',
      },
    });
  }
  render() {
    return (
      <>
        <article>
          <h1>Tech category page</h1>
          {/*<p>{this.myQuery()}</p>*/}
          <ProductSmallCard />
        </article>
      </>
    );
  }
}

export default TechPage;
