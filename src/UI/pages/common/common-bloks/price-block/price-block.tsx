import React, { PureComponent } from 'react';
import stylesPriceBlock from './price-block.module.css';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
import { LOCAL_CURRENT_CURRENCY } from '../../../../../constants';
import { IState, IProps, ISlimPrice, IPrice } from './price-block.model';

class PriceBlock extends PureComponent<IProps, IState> {
  private prices: ISlimPrice[] = [{ symbol: '', amount: 0 }];
  constructor(props: IProps) {
    super(props);
    this.state = {
      symbol: '',
      amount: 0,
    };
  }

  async componentDidMount() {
    await this.priceQuery();
  }
  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ) {
    const currentCurrency = this.props.symbolCurrency;
    const prePrice = this.prices.find((item) => {
      if (item.symbol === currentCurrency) {
        return { symbol: item.symbol, amount: item.amount };
      }
    });
    const price = prePrice ? prePrice : { symbol: '', amount: 0 };
    if (price.symbol !== prevState.symbol) {
      if (price) {
        await this.setState(() => {
          return {
            symbol: price.symbol,
            amount: price.amount,
          };
        });
      }
    }
  }

  async priceQuery() {
    try {
      const idFromAddress = window.location.pathname.split(':')[1];
      const id = this.props.id ? this.props.id : idFromAddress;
      const localCurrency = await localStorage.getItem(LOCAL_CURRENT_CURRENCY);
      const currentCurrency: string = JSON.parse(
        localCurrency ? localCurrency : '',
      ).symbol;
      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id: id,
        },
      });
      const prices: ISlimPrice[] = data.product.prices.map((item: IPrice) => {
        return { symbol: item.currency.symbol, amount: item.amount };
      });
      this.prices = [...prices];
      const price = prices.find((item: ISlimPrice) => {
        if (item.symbol === currentCurrency) {
          return { symbol: item.symbol, amount: item.amount };
        } else return;
      });
      await this.setState(() => {
        return price ? price : { symbol: '', amount: 0 };
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
