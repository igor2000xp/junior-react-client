import React, { Component } from 'react';
import styles from './button-block.module.css';
import {
  IActiveAttrPdp, IButtonBlockProps,
  IProduct,
  localBasketItemInit,
  priceInit
} from '../../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../constants';
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
      await this.goToBasket();
    }
  }

  async goToBasket() {
    const activeAttributes: IActiveAttrPdp[] = await getActiveAttrFromLocal();
    const productId = this.productId;
    const prices = Array.isArray(this.props.product.prices) ? this.props.product.prices : [priceInit];
    const product:IProduct = this.props.product;
    this.localBaskets = await getFromLocalBasket();
    if (
      !this.localBaskets[0].productId &&
      this.localBaskets[0].productId !== '' &&
      !this.localBaskets
    ) {
      // 'Check if the basket was empty then init it'
      this.localBaskets = [
        {
          quantity: 1,
          productId,
          activeAttributes,
          attributes: product.attributes,
          prices,
          id: product.id,
          name: product.name,
          brand: product.brand,
          gallery: product.gallery,
        },
      ];
    }
    // Other cart checks
    this.localBaskets = settleFullBasket(
      this.localBaskets,
      activeAttributes,
      this.productId,
      product.attributes,
      prices,
      product,
    );
    await localStorage.setItem(LOCAL_BASKET, JSON.stringify(this.localBaskets));
    this.props.renewBasket(this.localBaskets);
  }

  async componentWillUnmount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  render() {
    // const linkOut = this.props.inStock ? '/' : '';
    const buttonOut = this.props.inStock ? '' : styles.notActive;
    return (
      <div onClick={this.clickToOut}>
        {/*<Link to={linkOut}>*/}
          <button className={`${styles.wrapper} ${buttonOut}`}>
            <h2>ADD TO CART</h2>
          </button>
        {/*</Link>*/}
      </div>
    );
  }
}

// export default ButtonBlock;
export default connect(mapStateToProps, mapDispatchToProps)(ButtonBlock);
