import React, { Component } from 'react';
import client from '../../../../../graphql/apollo';
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
} from '../../../../../graphql/generated';

interface IProps {
  productId: string;
}

class ItemImageById extends Component{

  constructor(props: IProps) {
    super(props);
  }
  componentDidMount() {

  }
  async myQuery(categoryId: string) {
    const queryResult = await client.query<GetProductByIdQuery>({
      query: GetProductByIdDocument,
      variables: {
        category: categoryId,
      },
    });
    console.log(queryResult);
    // this.print = { ...queryResult };
    // console.log(this.print);
    return queryResult;
  }

  render() {
    return (
      <></>
    );
  }
}

export default ItemImageById;
