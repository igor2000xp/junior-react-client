import React, { Component } from 'react';
import { ICurrency } from '../../header';
import stylesCurrency from './currency-item.module.css';

interface IProps {
  // key: number;
  label: string;
  currencySymbol: string;
  onClick: () => Promise<ICurrency>;
}

class CurrencyItem extends Component<IProps> {
  render() {
    return (
      <div className={stylesCurrency.currencyText} onClick={this.props.onClick}>
        {this.props.currencySymbol} {this.props.label}
      </div>
    );
  }
}

export default CurrencyItem;
