import React from 'react';
import stylesPriceBlock from './mini-price-block.module.css';
import PriceBlock from '../../../../../common/common-bloks/price-block/price-block';

class MiniPriceBlock extends PriceBlock {
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

export default MiniPriceBlock;
