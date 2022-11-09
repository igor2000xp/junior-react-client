import React from 'react';
import stylesPriceBlock from './mini-price-block.module.css';
import PriceBlockAbstractClass from '../../../../main-cart/abstract-classes/PriceBlockAbstractClass';
import { State } from '../../../../../../../store/store';
import { setCurrency } from '../../../../../../../store/currencySlice';
import { connect } from 'react-redux';
import { IPriceBlockProps } from '../../../../../common-models';

type IProps = Readonly<IPriceBlockProps>;

const mapStateToProps = (state: State) => {
  return { symbol: state.currency.symbol };
};
const mapDispatchToProps = { setCurrency };

class MiniPriceBlock extends PriceBlockAbstractClass {
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

// export default MiniPriceBlock;
export default connect(mapStateToProps, mapDispatchToProps)(MiniPriceBlock);
