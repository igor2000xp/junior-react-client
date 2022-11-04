import React from 'react';
import stylesMBlock from './mini-cart-item.module.css';
import MiniCartBasicBlock from '../mini-cart-basic-block/mini-cart-basic-block';
import {
  ICardItemProps,
  ICardItemState, IModifiedProduct,
  modifiedProductInit,
  modifiedAttrProductsInit,
} from '../../../common-models';
import CartItemBlockAbstractClass from '../../main-cart/abstract-classes/CartItemBlockAbstractClass';
import { State } from '../../../../../store/store';
import { renewBasket } from '../../../../../store/cartSlice';
import { connect } from 'react-redux';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

const mapStateToProps = (state: State) => {
  return { cart: state.cart.cart };
};
const mapDispatchToProps = { renewBasket };

class MiniCartItem extends CartItemBlockAbstractClass {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ): Promise<void> {
    await super.componentDidUpdate(prevProps, prevState);
  }

  render() {
    const modifiedAttrProducts =
      this.state.quantityInBasket !== 0
        ? this.modifiedAttrProducts
        : [modifiedAttrProductsInit];
    const prodGallery =
      typeof this.props.basket.gallery !== 'undefined'
        ? this.props.basket.gallery[this.state.mainImageIndex]
        : '';
    const isArrowButtons = false;
    let modifiedProduct: IModifiedProduct;
    if (this.state.quantityInBasket === 0) {
      modifiedProduct = modifiedProductInit;
      modifiedProduct.id = '';
    } else {
      modifiedProduct = this.modifiedProduct;
    }
    const basketId = this.props.basket.productIdAttr;
    const initQuantity = this.props.cart.find((item) => {
      return item.productIdAttr === basketId;
    });
    const quantity = initQuantity ? initQuantity.quantity : 0;

    return (
      <article className={stylesMBlock.wrapper}>
        <section className={stylesMBlock.leftSide}>
          <MiniCartBasicBlock
            modifiedProduct={modifiedProduct}
            id={this.props.basket.id}
            modifiedAttrProducts={modifiedAttrProducts}
          />
        </section>

        <aside className={stylesMBlock.rightSide}>
          <section className={stylesMBlock.buttonSide}>
            <button
              className={`${stylesMBlock.buttonQuality}`}
              onClick={this.plusHandle}
            >
              <p className={stylesMBlock.plus} />
            </button>

            <div className={stylesMBlock.numberInBasket}>
              {quantity}
            </div>

            <button
              className={stylesMBlock.buttonQuality}
              onClick={this.minusHandle}
            >
              <p className={stylesMBlock.minus} />
            </button>
          </section>

          <section>
            <div className={stylesMBlock.imageBlock}>
              <img src={prodGallery} alt="product image" />

              {isArrowButtons ? (
                <button
                  className={`${stylesMBlock.arrow} ${stylesMBlock.arrowLeft}`}
                  onClick={() => this.handleImagePrev()}
                >
                  <div className={`${stylesMBlock.arrowSvgLeft}`} />
                </button>
              ) : (
                <div />
              )}

              {isArrowButtons ? (
                <button
                  className={`${stylesMBlock.arrow} ${stylesMBlock.arrowRight}`}
                  onClick={() => this.handleImageNext()}
                >
                  <div className={`${stylesMBlock.arrowSvgRight}`} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCartItem);
