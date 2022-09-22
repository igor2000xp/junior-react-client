import React from 'react';
import styles from './mini-cart-basic-block.module.css';
import CardBasicBlockPlp from '../../plp-card/plp-card-blocks/card-basic-block/card-basic-block-plp';
import { IProductAttribute } from '../../../common-models';
import MiniCartCommonAttributes from '../mini-cart-common-attributes/mini-cart-common-attributes';
import MiniPriceBlock from '../miniCartBlocks/blocks/mini-price-block/mini-price-block';

class MiniCartBasicBlock extends CardBasicBlockPlp {
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
