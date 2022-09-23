import React from 'react';
import stylesPriceBlock from './mini-price-block.module.css';
import PriceBlock from '../../../../../common/common-bloks/price-block/price-block';

class MiniPriceBlock extends PriceBlock {
  render() {
    const currency = !this.props.isEmpty ? this.state.symbol : '';
    const price: number = !this.props.isEmpty ? this.state.amount : 0;

    return (
      <>
        <div className={stylesPriceBlock.priceBlock}>
          <h5>{`${currency} ${price}`}</h5>
        </div>
      </>
    );
  }
}

export default MiniPriceBlock;
