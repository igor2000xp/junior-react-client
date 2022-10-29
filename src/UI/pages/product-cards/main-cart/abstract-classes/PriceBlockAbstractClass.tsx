import React, { Component } from 'react';
import { IPriceBlockProps, IPriceBlockState } from '../../../common/common-bloks/price-block/price-block.model';
import { SymbolCurrency } from '../../../common-models';

type IProps = Readonly<IPriceBlockProps>;
type IState = Readonly<IPriceBlockState>;

class PriceBlockAbstractClass extends Component<IProps, IState> {
  // prices: ISlimPrice[] = [{ symbol: SymbolCurrency.SymbolUsd, amount: 0 }];
  // private id = '';
  // private zeroProductId: string = '';
  // private isPdp = true;
  // private isCategory = true;
  constructor(props: IProps) {
    super(props);
    // this.zeroProductId = localStorage.getItem(PRODUCT_LIST_FIRST_ID) as string;
    this.state = {
      symbol: SymbolCurrency.SymbolUsd,
      amount: 0,
    };
  }

  // componentDidMount() {
  //   const symbol = this.props.symbolCurrency ? this.props.symbolCurrency : SymbolCurrency.SymbolUsd;
  //   const objAmount = this.props.prices?.find((item) => {
  //     return item.currency.symbol === symbol ? item : 0;
  //   });
  //   const amount = objAmount ? objAmount.amount : 0;
  //   // console.log(this.props.prices);
  //   console.log(symbol, amount, 'mount');
  //   this.setState({ symbol, amount });
  //   // await this.setState({prodId: this.props.id});
  //   // const id = this.state.prodId ? this.state.prodId : this.zeroProductId;
  //   // await this.priceQuery(id);
  // }

  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
  // componentDidUpdate(prevProps: Readonly<IProps>, prevState) {
    // if (prevProps.id !== this.props.id) {
    //   await this.setState({prodId: this.props.id})
    // }
    // if (
    //   prevProps.id !== this.props.id ||
    //   prevProps.symbolCurrency !== this.props.symbolCurrency
    // ) {
    //   const id = this.state.prodId !== '' ? this.state.prodId : this.zeroProductId;
    //   await this.priceQuery(id);
    // }



    // if (this.state.symbol !== this.props) {
    //   const symbol = this.props.symbolCurrency ? this.props.symbolCurrency : SymbolCurrency.SymbolUsd;
    //   const objAmount = this.props.prices?.find((item) => {
    //     return item.currency.symbol === symbol ? item : 0;
    //   });
    //   const amount = objAmount ? objAmount.amount : 0;
    //   // console.log(this.props.prices);
    //   // console.log(amount);
    //   this.setState({ symbol, amount });
    // }
  // }

  // async priceQuery(id: string) {
  //   try {
  //     const idFromAddress = location.pathname.split(':')[1];
  //     const idCategory = location.pathname.split(':')[0];
  //     this.isCategory = Boolean(idCategory === 'category');
  //     this.isPdp = Boolean(idFromAddress);
  //     this.id = this.isPdp && this.isCategory ? idFromAddress : this.props.id;
  //
  //     const { data } = await client.query({
  //       query: GetProductByIdDocument,
  //       variables: {
  //         id
  //       },
  //       fetchPolicy: 'no-cache',
  //     });
  //
  //     const prices: ISlimPrice[] = data.product.prices.map((item: IPrice) => {
  //       return { symbol: item.currency.symbol, amount: item.amount };
  //     });
  //     this.prices = [...prices];
  //
  //     const price = prices.find((item: ISlimPrice) => {
  //       if (item.symbol === this.props.symbolCurrency) {
  //         return { symbol: item.symbol, amount: item.amount };
  //       } else return;
  //     });
  //
  //     await this.setState({
  //       symbol: price ? price.symbol : SymbolCurrency.SymbolUsd,
  //       amount: price ? price.amount : 0,
  //       prodId: this.id,
  //     });
  //   } catch (err) {
  //     console.log(`Error loading data from server ${err}`);
  //   }
  // }

  render() {
    return (
      <></>
    );
  }
}

export default PriceBlockAbstractClass;
