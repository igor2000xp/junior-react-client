import React, { Component } from 'react';
import client from '../../graphql/apollo';
import {
  GetProductsByCategoryDocument,
  GetProductsByCategoryQuery,
} from '../../graphql/generated';
import { ProductSmallCard } from './product-cards/page-cart/product-small-card';
import './Page.css';

import { Link } from 'react-router-dom';

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
          <Link to="/pdp">
            <ProductSmallCard />
          </Link>
        </article>
      </>
    );
  }
}

export default TechPage;
