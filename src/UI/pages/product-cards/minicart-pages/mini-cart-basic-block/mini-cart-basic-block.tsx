import React, { Component } from 'react';
import styles from './mini-cart-basic-block.module.css';
import CardBasicBlockPlp from '../../plp-card/plp-card-blocks/card-basic-block/card-basic-block-plp';
import { IProductAttribute } from '../../../common-models';
import CommonAttributeSetPlp from '../../plp-card/plp-card-blocks/common-atribute-set-plp/common-attribute-set-plp';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import MiniCartCommonAttributes from '../mini-cart-common-attributes/mini-cart-common-attributes';

export interface MiniCartBasicBlockProps {}

class MiniCartBasicBlock extends CardBasicBlockPlp {
  render() {
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
    const productId =
      this.props.product.id === '' ? 'xbox-series-s' : this.props.product.id;
    const symbolCurrency = this.props.currentCurrency;
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>{this.props.product.brand}</h2>
        </div>

        <div className={styles.name}>
          <h3>{this.props.product.name}</h3>
        </div>

        <MiniCartCommonAttributes
          attributes={arrAttributes}
          productID={productId}
          modifiedProducts={this.props.modifiedProducts}
        />

        <div className={styles.priceBlock}>
          <div>
            <PriceBlock id={productId} symbolCurrency={symbolCurrency} />
          </div>
        </div>
      </article>
    );
  }
}

export default MiniCartBasicBlock;
