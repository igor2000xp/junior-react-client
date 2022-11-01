import React from 'react';
import styles from './main-cart-item.module.css';
import {
  ICardItemProps, IModifiedProduct,
  modifiedProductInit,
  modifiedProductsInit,
} from '../../../common-models';
import MainCartBasicBlock from '../main-cart-blocks/main-cart-basic-block/main-cart-basic-block';
import CartItemBlockAbstractClass from '../abstract-classes/CartItemBlockAbstractClass';
import { State } from '../../../../../store/store';
import { renewBasket } from '../../../../../store/cartSlice';
import { connect } from 'react-redux';

type IProps = Readonly<ICardItemProps>;

const mapStateToProps = (state:State) => {
  return { cart: state.cart.cart };
};
const mapDispatchToProps = { renewBasket };

class MainCartItem extends CartItemBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    await super.componentDidMount();
  }

  render() {
    const modifiedProducts =
      this.state.quantityInBasket !== 0
        ? this.modifiedProducts
        : [modifiedProductsInit];
    const prodGallery =
      typeof this.product.gallery !== 'undefined'
        ? this.product.gallery[this.state.mainImageIndex]
        : ' ';
    const isArrowButtons = !(
      prodGallery === ' ' || this.product.gallery.length === 1
    );
    let modifiedProduct: IModifiedProduct;
    if (this.state.quantityInBasket === 0) {
      modifiedProduct = modifiedProductInit;
      modifiedProduct.id = '';
    } else {
      modifiedProduct = this.modifiedProduct;
    }
    const quantity0 = this.props.cart.find((item) => {
      return item.id === this.state.id;
    });
    const quantity = quantity0? quantity0.quantity : 0;

    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <MainCartBasicBlock
            modifiedProduct={modifiedProduct}
            modifiedProducts={modifiedProducts}
          />
        </aside>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button
              className={`${styles.buttonQuality}`}
              onClick={this.plusHandle}
            >
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              {quantity}
            </div>
            <button className={styles.buttonQuality} onClick={this.minusHandle}>
              <p className={styles.minus} />
            </button>
          </section>

          <section>
            <div className={styles.imageBlock}>
              <img src={prodGallery} alt="product image" />
              {isArrowButtons ? (
                <button
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  onClick={() => this.handleImagePrev()}
                >
                  <div className={`${styles.arrowSvgLeft}`} />
                </button>
              ) : (
                <div />
              )}
              {isArrowButtons ? (
                <button
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  onClick={() => this.handleImageNext()}
                >
                  <div className={`${styles.arrowSvgRight}`} />
                </button>
              ) : (
                <div />
              )}
            </div>
          </section>
        </aside>
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCartItem);
