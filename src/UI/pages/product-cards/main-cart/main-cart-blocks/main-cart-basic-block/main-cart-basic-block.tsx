import React from 'react';
import styles from './main-cart-basic-block.module.css';
import BasicBlock from '../../../pdp-card/pdp-card-blocks/basic-block';
import { IProductAttribute } from '../../../../common-models';
import PriceBlock from '../../../../common/common-bloks/price-block/price-block';
import MainCartCommonAttributeSet from '../main-cart-common-atribute-set/main-cart-common-attribute-set';

class MainCartBasicBlock extends BasicBlock {
  render() {
    const arrAttributes = this.props.modifiedProduct.attributes as IProductAttribute[];
    const productId =
      this.props.modifiedProduct.id === '' ? 'xbox-series-s' : this.props.modifiedProduct.id;
    const isEmpty: boolean = this.props.modifiedProduct.id === '';
    const brand = isEmpty ? 'Your cart is empty' : this.props.modifiedProduct.brand;
    const prices = Array.isArray(this.props.modifiedProduct.prices) ? this.props.modifiedProduct.prices : [this.props.modifiedProduct.prices];
    return (
      <article className={styles.wrapper}>
        <section className={styles.brand}>
          <h2>{brand}</h2>
        </section>

        <section className={styles.name}>
          <h3>{this.props.modifiedProduct.name}</h3>
        </section>

        <section className={styles.priceBlock}>
          <PriceBlock
            // isEmpty={isEmpty}
            prices={prices}
          />
        </section>

        <section className={styles.attributes}>
          <MainCartCommonAttributeSet
            attributes={arrAttributes}
            productID={productId}
            modifiedProducts={this.props.modifiedProducts}
          />
        </section>
      </article>
    );
  }
}

export default MainCartBasicBlock;
