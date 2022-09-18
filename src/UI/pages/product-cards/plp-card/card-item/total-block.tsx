import React, { Component } from 'react';
import totalStyle from './total-block.module.css';
import {
  ILocalBasket,
  ILocalCurrency,
  ITotalBlockProps,
  ITotalBlockState,
  localBasketItemInit,
  localCurrencyInit,
  totalBlockStateInit,
} from '../../../common-models';
import {
  getProductsListFromBasket,
  getTotalItems,
} from '../../../main-page-helpers/main-page-helpers';
import { LOCAL_BASKET, LOCAL_CURRENT_CURRENCY } from '../../../../../constants';
import { Link } from 'react-router-dom';

type IState = Readonly<ITotalBlockState>;
type IProps = Readonly<ITotalBlockProps>;

class TotalBlock<ITotalBlockProps, ITotalBlockState> extends Component<
  IProps,
  IState
> {
  private localCurrency: ILocalCurrency = localCurrencyInit;
  private localBasket: ILocalBasket[] = [localBasketItemInit];

  constructor(props: IProps) {
    super(props);
    this.state = totalBlockStateInit;
  }

  async componentDidUpdate(
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

  componentDidMount() {
    this.localCurrency = JSON.parse(
      localStorage.getItem(LOCAL_CURRENT_CURRENCY) as string,
    );
  }

  render() {
    return (
      <article className={totalStyle.totalWrapper}>
        <div className={totalStyle.totalSection}>
          <div className={totalStyle.sectionColumns}>
            <section className={totalStyle.leftTotal}>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <div className={totalStyle.totalBold}>
                <p>Total:</p>
              </div>
            </section>
            <section className={totalStyle.rightTotal}>
              <p>{`${this.props.currentCurrency}${this.state.vat}`}</p>
              <p>{this.state.quantity}</p>
              <p>{`${this.props.currentCurrency}${this.state.sum}`}</p>
            </section>
          </div>
          <Link to={'/'}>
            <button className={totalStyle.orderButton}>
              <p>Order</p>
            </button>
          </Link>
        </div>
      </article>
    );
  }
}

export default TotalBlock;
