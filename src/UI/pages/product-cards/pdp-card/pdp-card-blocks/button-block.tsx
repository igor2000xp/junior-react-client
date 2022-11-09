import React, { Component } from 'react';
import styles from './button-block.module.css';
import {
  IActiveAttrPdp,
  IButtonBlockProps,
  IProduct,
  localBasketItemInit,
  priceInit,
} from '../../../common-models';
import { LOCAL_BASKET } from '../../../../../constants';
import {
  getActiveAttrFromLocal,
  getFromLocalBasket,
  settleFullBasket,
} from './helpers';
import { State } from '../../../../../store/store';
import { renewBasket } from '../../../../../store/cartSlice';
import { connect } from 'react-redux';

type IProps = Readonly<IButtonBlockProps>;

const mapStateToProps = (state: State) => {
  return { cart: state.cart.cart };
};
const mapDispatchToProps = { renewBasket };

class ButtonBlock extends Component<IProps> {
  private localBaskets = [localBasketItemInit];
  private productId = location.pathname.split(':')[1];
  constructor(props: any) {
    super(props);
    this.clickToOut = this.clickToOut.bind(this);
  }

  async clickToOut() {
    if (this.props.inStock) {
      await this.AddIntoBasket();
    }
  }
  async componentDidMount() {}

  async AddIntoBasket() {
    const activeAttributes: IActiveAttrPdp[] = await getActiveAttrFromLocal();
    const productIdAttr = JSON.stringify(activeAttributes) + this.productId;
    const prices = Array.isArray(this.props.product.prices)
      ? this.props.product.prices
      : [priceInit];
    const product: IProduct = this.props.product;
    this.localBaskets = await getFromLocalBasket();
    if (
      !this.localBaskets[0].productIdAttr &&
      this.localBaskets[0].productIdAttr !== '' &&
      !this.localBaskets
    ) {
      // 'Check if the basket was empty then init it'
      this.localBaskets = [
        {
          quantity: 1,
          id: product.id,
          productIdAttr,
          activeAttributes,
          attributes: product.attributes,
          prices,
          name: product.name,
          brand: product.brand,
          gallery: product.gallery,
        },
      ];
    }
    // Other cart checks
    this.localBaskets = settleFullBasket(
      this.localBaskets,
      product.id,
      activeAttributes,
      product.attributes,
      prices,
      product,
    );
    await localStorage.setItem(LOCAL_BASKET, JSON.stringify(this.localBaskets));
    this.props.renewBasket(this.localBaskets);
  }

  render() {
    const buttonOut = this.props.inStock ? '' : styles.notActive;
    return (
      <div onClick={this.clickToOut}>
        <button className={`${styles.wrapper} ${buttonOut}`}>
          <h2>ADD TO CART</h2>
        </button>
      </div>
    );
  }
}

// export default ButtonBlock;
export default connect(mapStateToProps, mapDispatchToProps)(ButtonBlock);
