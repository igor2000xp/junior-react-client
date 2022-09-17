import React, { Component } from 'react';
import stylesMBlock from './mini-cart-item.module.css';
// import NameBlock from './blocks/name-block';
// import PriceBlock from '../../../common/common-bloks/price-block/price-block';
// import MiniCartTextBlock from './blocks/mini-cart-text-block';
// import MiniCartColorBlock from './blocks/mini-cart-color-block';
// import ImageBlock from './blocks/image-block';
import MiniCartBasicBlock from '../mini-cart-basic-block/mini-cart-basic-block';
import {
  IActiveBasketAttr, ICardItemProps, ICardItemState,
  IModifiedProducts,
  IProduct,
  localActiveAttributesInit, modifiedProductsInit,
  productInit, SymbolCurrency
} from '../../../common-models';
import CardItem from '../../plp-card/card-item/card-item';
import styles from '../../plp-card/card-item/card-item.module.css';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

class MiniCartItem extends CardItem {

  constructor(props: IProps) {
    super(props);
  }

  render() {
    const modifiedProducts = this.modifiedProducts;
    const prodGallery =
      typeof this.product.gallery !== 'undefined'
        ? this.product.gallery[this.state.mainImageIndex]
        : '';
    const isArrowButtons = !(this.product.gallery.length === 1);
    return (
      <article className={stylesMBlock.wrapper}>
        <section className={stylesMBlock.leftSide}>
          <MiniCartBasicBlock
            product={this.product}
            modifiedProducts={modifiedProducts}
            currentCurrency={this.props.currency.symbol}
          />
        </section>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button
              className={`${styles.buttonQuality}`}
              onClick={this.plusHandle}
            >
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              {this.state.quantityInBasket}
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

        {/*<section className={stylesMBlock.rightSide}>*/}

        {/*</section>*/}
      </article>
    );
  }
}

export default MiniCartItem;
