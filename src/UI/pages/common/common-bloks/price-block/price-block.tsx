import React, { Component } from 'react';
import stylesPriceBlock from './price-block.module.css';
import { IPrice } from '../../../main-page-madel/main-page.model';
import { SymbolCurrency } from '../../models/header.model';

interface IProps {
  price: IPrice | IPrice[];
  symbolCurrency: SymbolCurrency;
}

class PriceBlock extends Component<IProps> {
  render() {
    const currency = this.props.symbolCurrency;
    let price: number;
    if (Array.isArray(this.props.price)) {
      const arrPrice = this.props.price.find(
        (item) => item.symbol === currency,
      );
      price = arrPrice ? arrPrice.amount : 0;
    } else {
      price = this.props.price.amount;
    }

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
