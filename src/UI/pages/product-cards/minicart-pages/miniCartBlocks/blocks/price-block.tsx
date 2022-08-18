import React, { Component } from 'react';
import stylesPrice from './price-block.module.css';

class PriceBlock extends Component {
  render() {
    return (
      <>
        <div className={stylesPrice.priceBlock}>
          <h5>$50.0</h5>
        </div>
      </>
    );
  }
}

export default PriceBlock;
