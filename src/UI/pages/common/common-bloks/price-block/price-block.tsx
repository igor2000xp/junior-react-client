import React from 'react';
import stylesPriceBlock from './price-block.module.css';
import { IPriceBlockProps, IPriceBlockState } from './price-block.model';
import { SymbolCurrency } from '../../../common-models';
import PriceBlockAbstractClass from '../../../product-cards/main-cart/abstract-classes/PriceBlockAbstractClass';
// import { mapStateToPropsFactory } from 'react-redux/es/connect/mapStateToProps';
import { State } from '../../../../../store/store';
import { connect } from 'react-redux';
import { setCurrency } from '../../../../../store/currencySlice';

type IProps = Readonly<IPriceBlockProps>;
type IState = Readonly<IPriceBlockState>;

const mapStateToProps = (state:State) => {
  return { symbol: state.currency.symbol }
};
const mapDispatchToProps = { setCurrency };

class PriceBlock extends PriceBlockAbstractClass {
  private isPropsFirst = true;
  constructor(props: IProps) {
    super(props);
  }
  async componentDidMount() {
    const symbol = this.props.symbol ? this.props.symbol : SymbolCurrency.SymbolUsd;
    const objAmount = this.props.prices?.find((item) => {
      return item.currency.symbol === symbol ? item : 0;
    });
    const amount = objAmount ? objAmount.amount : 0;
    this.setState({ symbol, amount });

  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
    const symbol = this.props.symbol ? this.props.symbol : SymbolCurrency.SymbolUsd;
    const objAmount = this.props.prices?.find((item) => {
      return item.currency.symbol === symbol ? item : 0;
    });
    const amount = objAmount ? objAmount.amount : 0;
    if (typeof this.props.prices !== 'undefined' && this.props.prices[0].amount !== 0 && this.isPropsFirst) {
      if (amount !== 0) this.isPropsFirst = false;
      this.setState({ symbol, amount });
    }
    if (prevState.symbol !== symbol) {
      this.setState({ symbol, amount });
    }

  }
  render() {
    const currency = this.state.symbol;
    const price = this.state.amount;
    return (
      <>
        <div className={stylesPriceBlock.priceBlock}>
          <h5>{`${currency} ${price.toFixed(2)}`}</h5>
        </div>
      </>
    );
  }
}

// export default PriceBlock;
export default connect(mapStateToProps, mapDispatchToProps)(PriceBlock);
