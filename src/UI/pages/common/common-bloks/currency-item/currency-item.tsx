import React, { Component } from 'react';
import stylesCurrency from './currency-item.module.css';
import { ICurrency } from '../../../common-models';

interface IProps {
  currentLabel: string;
  label: string;
  currencySymbol: string;
  onClick: () => Promise<ICurrency>;
}

interface IState {
  hoveredLight: string;
  isCurrent: boolean;
}

class CurrencyItem extends Component<IProps, IState> {
  private currentLabel: string;

  constructor(props: IProps) {
    super(props);
    this.lightDiv = this.lightDiv.bind(this);
    this.cancelLightDiv = this.cancelLightDiv.bind(this);
    this.currentLabel = '';
    this.state = {
      hoveredLight: '',
      isCurrent: false,
    };
  }

  async lightDiv() {
    await this.setState(() => {
      return {
        hoveredLight: stylesCurrency.overedCurrency,
      };
    });
  }

  async cancelLightDiv() {
    await this.setState(() => {
      return {
        hoveredLight: '',
      };
    });
  }

  async componentDidMount() {
    this.currentLabel =
      this.props.currentLabel === this.props.label
        ? stylesCurrency.currentCurrency
        : '';
    this.setState(() => {
      return {
        isCurrent: true,
      };
    });
  }

  render() {
    return (
      <div
        className={`${stylesCurrency.currencyText} ${this.state.hoveredLight} ${this.currentLabel}`}
        onClick={this.props.onClick}
        onPointerOver={this.lightDiv}
        onPointerOut={this.cancelLightDiv}
      >
        {this.props.currencySymbol} {this.props.label}
      </div>
    );
  }
}

export default CurrencyItem;
