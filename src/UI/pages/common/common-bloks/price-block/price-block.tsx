import React, { PureComponent } from 'react';
import stylesPriceBlock from './price-block.module.css';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
import { IState, IProps, ISlimPrice, IPrice } from './price-block.model';
import { SymbolCurrency } from '../../../common-models';
import { PRODUCT_LIST_FIRST_ID } from '../../../../../constants';

class PriceBlock extends PureComponent<IProps, IState> {
  prices: ISlimPrice[] = [{ symbol: '', amount: 0 }];
  private id = '';
  private zeroProductId: string = '';
  private isPdp = true;
  private isCategory = true;
  constructor(props: IProps) {
    super(props);
    this.zeroProductId = localStorage.getItem(PRODUCT_LIST_FIRST_ID) as string;
    this.state = {
      symbol: '',
      amount: 0,
      prodId: '',
    };
  }

  async componentDidMount() {
    await this.setState({prodId: this.props.id});
    const id = this.state.prodId ? this.state.prodId : this.zeroProductId;
    await this.priceQuery(id);
  }

  async componentDidUpdate(prevProps: Readonly<IProps>) {
    if (prevProps.id !== this.props.id) {
      await this.setState({prodId: this.props.id})
    }
    if (
      prevProps.id !== this.props.id ||
      prevProps.symbolCurrency !== this.props.symbolCurrency
    ) {
      const id = this.state.prodId !== '' ? this.state.prodId : this.zeroProductId;
      await this.priceQuery(id);
    }
  }

  async priceQuery(id: string) {
    try {
      const idFromAddress = location.pathname.split(':')[1];
      const idCategory = location.pathname.split(':')[0];
      this.isCategory = Boolean(idCategory === 'category');
      this.isPdp = Boolean(idFromAddress);
      this.id = this.isPdp && this.isCategory ? idFromAddress : this.props.id;

      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id
        },
        fetchPolicy: 'no-cache',
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
      console.log(`Error loading data from server ${err}`);
    }
  }

  render() {
    const currency = !this.props.isEmpty ? this.state.symbol : '';
    const price: number = !this.props.isEmpty ? this.state.amount : 0;

    return (
      <>
        <div className={stylesPriceBlock.priceBlock}>
          <h5>{`${currency} ${price.toFixed(2)}`}</h5>
        </div>
      </>
    );
  }
}

export default PriceBlock;
