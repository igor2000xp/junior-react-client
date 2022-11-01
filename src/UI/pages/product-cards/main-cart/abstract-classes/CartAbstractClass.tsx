import {
  ICurrency,
  IMainCartProps,
  IMainCartState,
  Label,
  localBasketItemInit,
  SymbolCurrency
} from '../../../common-models';
import { Component } from 'react';
import { ACTIVE_PRODUCT_ATTRIBUTES, LOCAL_BASKET, LOCAL_CURRENT_CURRENCY } from '../../../../../constants';

type IProps = Readonly<IMainCartProps>;
type IState = Readonly<IMainCartState>;

abstract class CartAbstractClass extends Component<IProps, IState> {
  protected localBasket = [localBasketItemInit];
  protected currentCurrencyLabel = Label.Usd;
  protected isChangedPlusMinusButtons = false;
  protected symbol = SymbolCurrency.SymbolUsd;

  protected constructor(props: IProps) {
    super(props);
    this.state = {
      productId: '',
      currentCurrency: SymbolCurrency.SymbolUsd,
      localBasket: [localBasketItemInit],
      isChanged: false,
      isChangedPlusMinusButtons: false,
      totalItems: 0,
    };
  }

  async componentDidMount() {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await this.setState(() => {
      return {
        localBasket: this.localBasket,
      };
    });
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    const currency: ICurrency = JSON.parse(
      (await localStorage.getItem(LOCAL_CURRENT_CURRENCY)) as string,
    );
    this.currentCurrencyLabel = currency.label;
    this.setState({
      currentCurrency: currency.symbol,
      isChanged: true,
    });
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    this.localBasket = JSON.parse(
      (await localStorage.getItem(LOCAL_BASKET)) as string,
    );
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  async componentWillUnmount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  render() {
    return (
      <></>
    )
  }
}

export default CartAbstractClass;
