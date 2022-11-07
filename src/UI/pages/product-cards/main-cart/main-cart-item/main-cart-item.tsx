import React from 'react';
import styles from './main-cart-item.module.css';
import {
  ICardItemProps, ICardItemState, IModifiedProduct,
  modifiedAttrProductsInit,
} from '../../../common-models';
import MainCartBasicBlock from '../main-cart-blocks/main-cart-basic-block/main-cart-basic-block';
import CartItemBlockAbstractClass from '../abstract-classes/CartItemBlockAbstractClass';
import { State } from '../../../../../store/store';
import { renewBasket } from '../../../../../store/cartSlice';
import { connect } from 'react-redux';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

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

  async componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): Promise<void> {
    return super.componentDidUpdate(prevProps, prevState);
  }

  render() {
    const modifiedAttrProducts =
      this.state.quantityInBasket !== 0
        ? this.modifiedAttrProducts
        : [modifiedAttrProductsInit];
    const prodGallery =
      typeof this.props.basket.gallery !== 'undefined'
        ? this.props.basket.gallery[this.state.mainImageIndex]
        : ' ';
    const isArrowButtons = !(
      prodGallery === ' ' || this.props.basket.gallery.length === 1
    );
    const modifiedProduct: IModifiedProduct = this.modifiedProduct;
    const basketId = this.props.basket.productIdAttr;
    const initQuantity = this.props.cart.find((item) => {
      return item.productIdAttr === basketId;
    });
    const quantity = initQuantity ? initQuantity.quantity : 0;

    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <MainCartBasicBlock
            modifiedProduct={modifiedProduct}
            id={this.props.basket.id}
            modifiedAttrProducts={modifiedAttrProducts}
          />
        </aside>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button
              className={`${styles.buttonQuantity}`}
              onClick={this.plusHandle}
            >
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              {quantity}
            </div>
            <button className={styles.buttonQuantity} onClick={this.minusHandle}>
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
