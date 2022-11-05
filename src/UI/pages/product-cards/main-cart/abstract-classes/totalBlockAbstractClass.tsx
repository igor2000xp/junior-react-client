import React, { Component } from 'react';
import {
  ILocalBasket,
  ILocalCurrency,
  ITotalBlockProps,
  ITotalBlockState, localBasketItemInit,
  localCurrencyInit, totalBlockStateInit
} from '../../../common-models';
import { LOCAL_BASKET, LOCAL_CURRENT_CURRENCY } from '../../../../../constants';
import { getProductsListFromBasket, getTotalItems } from '../../../main-page-helpers/main-page-helpers';

type IState = Readonly<ITotalBlockState>;
type IProps = Readonly<ITotalBlockProps>;

class TotalBlockAbstractClass extends Component<IProps, IState> {
  protected localCurrency: ILocalCurrency = localCurrencyInit;
  protected localBasket: ILocalBasket[] = [localBasketItemInit];
  constructor(props:IProps) {
    super(props);
    this.state = totalBlockStateInit;
  }

  componentDidMount() {
    this.localCurrency = JSON.parse(
      localStorage.getItem(LOCAL_CURRENT_CURRENCY) as string,
    );
  }

  async componentDidUpdate (
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    this.localBasket = JSON.parse(localStorage.getItem(LOCAL_BASKET) as string);
    const localBasketForTotal = await getProductsListFromBasket(
      this.localBasket,
      this.props.currentCurrency,
    );
    const { sum, quantity, vat } = getTotalItems(localBasketForTotal);
    const isChangedPlusMinusButtons = this.props.isChangedPlusMinusButtons;
    if (
      prevState.sum !== sum ||
      prevProps.isChangedPlusMinusButtons !== isChangedPlusMinusButtons
    ) {
      this.setState({ sum, quantity, vat, isChangedPlusMinusButtons });
    }
  }


  render() {
    return (
      <></>
    );
  }
}

export default TotalBlockAbstractClass;
