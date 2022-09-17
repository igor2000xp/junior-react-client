import React, { Component } from 'react';
import stylesMBlock from './mini-cart-item.module.css';
// import NameBlock from './blocks/name-block';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import MiniCartTextBlock from './blocks/mini-cart-text-block';
import MiniCartColorBlock from './blocks/mini-cart-color-block';
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

        {/*<section className={stylesMBlock.rightSide}>*/}

        {/*</section>*/}
      </article>
    );
  }
}

export default MiniCartItem;
