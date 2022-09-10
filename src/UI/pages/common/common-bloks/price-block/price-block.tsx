import React, { PureComponent } from 'react';
import stylesPriceBlock from './price-block.module.css';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
import { LOCAL_CURRENT_CURRENCY } from '../../../../../constants';
import { IState, IProps, ISlimPrice, IPrice } from './price-block.model';
import { SymbolCurrency, zeroCurrencyInit } from '../../../common-models';

class PriceBlock extends PureComponent<IProps, IState> {
  private prices: ISlimPrice[] = [{ symbol: '', amount: 0 }];
  private id: string = 'xbox-series-s';
  private isPdp = true;
  private  isCategory =true;
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
    prevState: Readonly<IState>,
  ) {
    // const idFromAddress = location.pathname.split(':')[1];
    // this.id = this.props.id ? this.props.id : idFromAddress;
    console.log(prevProps.id, this.props.id, this.id);
    console.log(this.state.symbol, this.state.amount, this.props.symbolCurrency);
    if (prevProps.id !== this.props.id || prevProps.symbolCurrency !== this.props.symbolCurrency) {
      // console.log(prevProps.id, this.props.id, this.id);
      // console.log(this.state.symbol, this.state.amount);
      await this.priceQuery();
      console.log(prevProps.id, this.props.id);
      console.log(this.state.symbol, this.state.amount);
      // this.setState({
      //   prodId: this.props.id,
      // });
      // const currentCurrency = this.state.symbol;
      // const prePrice = this.prices.find((item) => {
      //   if (item.symbol === currentCurrency) {
      //     return { symbol: item.symbol, amount: item.amount };
      //   }
      // });
      // const price = prePrice ? prePrice : { symbol: '', amount: 0 };
      // if (price.symbol !== prevState.symbol) {
      //   if (price) {
      //     await this.setState(() => {
      //       return {
      //         symbol: price.symbol,
      //         amount: price.amount,
      //       };
      //     });
      //   }
      // }
    }
  }

  async priceQuery() {
    try {
      const idFromAddress = location.pathname.split(':')[1];
      const idCategory = location.pathname.split(':')[0];
      this.isCategory = Boolean(idCategory === 'category');
      this.isPdp = Boolean(idFromAddress);
      this.id = this.isPdp && this.isCategory ? idFromAddress : this.props.id;
      // console.log(this.id);

      // const localCurrency = await localStorage.getItem(LOCAL_CURRENT_CURRENCY);
      // const currentCurrency: string = JSON.parse(
      //   localCurrency ? localCurrency : JSON.stringify(zeroCurrencyInit),
      // ).symbol;

      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id: this.id,
        },
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
