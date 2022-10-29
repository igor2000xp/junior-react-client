import React from 'react';
import stylesPriceBlock from './price-block.module.css';
import PriceBlockAbstractClass from '../../../product-cards/main-cart/abstract-classes/PriceBlockAbstractClass';
import { State } from '../../../../../store/store';
import { connect } from 'react-redux';
import { setCurrency } from '../../../../../store/currencySlice';
import { IPriceBlockProps } from '../../../common-models';

type IProps = Readonly<IPriceBlockProps>;

const mapStateToProps = (state:State) => {
  return { symbol: state.currency.symbol }
};
const mapDispatchToProps = { setCurrency };

class PriceBlock extends PriceBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
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
