import React from 'react';
import styles from './mini-cart-basic-block.module.css';
import MainCartBasicBlock from '../../main-cart/main-cart-blocks/main-cart-basic-block/main-cart-basic-block';
import { IProductAttribute } from '../../../common-models';
import MiniCartCommonAttributes from '../mini-cart-common-attributes/mini-cart-common-attributes';
import MiniPriceBlock from '../mini-cart-blocks/blocks/mini-price-block/mini-price-block';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import PriceBlockAbstractClass from '../../main-cart/abstract-classes/PriceBlockAbstractClass';
import BasicBlock from '../../pdp-card/pdp-card-blocks/basic-block';

class MiniCartBasicBlock extends BasicBlock {
  render() {
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
    const productId =
      this.props.product.id === '' ? 'xbox-series-s' : this.props.product.id;
    const symbolCurrency = this.props.currentCurrency;
    const isEmpty: boolean = this.props.product.id === '';
    const brand = isEmpty ? 'Your cart is empty' : this.props.product.brand;

    return (
      <article>
        <div className={styles.brand}>
          <h2>{brand}</h2>
        </div>
        <div className={styles.name}>
          <h3>{this.props.product.name}</h3>
        </div>

        <div className={styles.priceBlock}>
          <div>
            <MiniPriceBlock
              id={productId}
              symbolCurrency={symbolCurrency}
              isEmpty={isEmpty}
            />
          </div>
        </div>

        <MiniCartCommonAttributes
          attributes={arrAttributes}
          productID={productId}
          modifiedProducts={this.props.modifiedProducts}
        />
      </article>
    );
  }
}

export default MiniCartBasicBlock;
