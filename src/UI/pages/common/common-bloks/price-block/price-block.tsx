import React, { PureComponent } from 'react';
import stylesPriceBlock from './price-block.module.css';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
import { IState, IProps, ISlimPrice, IPrice } from './price-block.model';
import { SymbolCurrency } from '../../../common-models';

class PriceBlock extends PureComponent<IProps, IState> {
  prices: ISlimPrice[] = [{ symbol: '', amount: 0 }];
  private id = 'xbox-series-s';
  private isPdp = true;
  private isCategory = true;
  constructor(props: IProps) {
    super(props);
    this.state = {
      symbol: '',
      amount: 0,
      prodId: 'xbox-series-s',
    };
  }

  async componentDidMount() {
    await this.priceQuery();
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    // prevState: Readonly<IState>,
  ) {
    if (
      prevProps.id !== this.props.id ||
      prevProps.symbolCurrency !== this.props.symbolCurrency
    ) {
      await this.priceQuery();
    }
  }

  async priceQuery() {
    try {
      const idFromAddress = location.pathname.split(':')[1];
      const idCategory = location.pathname.split(':')[0];
      this.isCategory = Boolean(idCategory === 'category');
      this.isPdp = Boolean(idFromAddress);
      this.id = this.isPdp && this.isCategory ? idFromAddress : this.props.id;

      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id: this.id,
        },
        fetchPolicy: "no-cache",
      });

      const prices: ISlimPrice[] = data.product.prices.map((item: IPrice) => {
        return { symbol: item.currency.symbol, amount: item.amount };
      });
      this.prices = [...prices];

      const price = prices.find((item: ISlimPrice) => {
        if (item.symbol === this.props.symbolCurrency) {
          return { symbol: item.symbol, amount: item.amount };
        } else return;
      });

      await this.setState({
        symbol: price ? price.symbol : SymbolCurrency.SymbolUsd,
        amount: price ? price.amount : 0,
        prodId: this.id,
      });
    } catch (err) {
      console.log(`Error of server query ${err}`);
    }
  }

  render() {
    const currency = this.state.symbol;
    const price: number = this.state.amount;

    return (
      <>
        <div className={stylesPriceBlock.priceBlock}>
          <h5>{`${currency} ${price}`}</h5>
        </div>
      </>
    );
  }
}

export default PriceBlock;
