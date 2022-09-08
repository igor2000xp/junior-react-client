import React, { Component } from 'react';
import styles from './card-basic-block.module.css';
import BasicBlock from '../../../pdp-card/cardBlocks/basic-block';
import {
  ICartBasicBlockProps,
  IProduct,
  IProductAttribute,
  SymbolCurrency,
} from '../../../../common-models';
import CommonAttributeSet from '../../../../common/common-bloks/common-attribute-set/common-attribute-set';
import PriceBlock from '../../../../common/common-bloks/price-block/price-block';

// export interface CartBasicBlockProps {}
// export interface ICartBasicBlockProps {
//   product: IProduct;
//   currentCurrency: SymbolCurrency;
// }
// type IProps = Readonly<ICartBasicBlockProps>;

class CardBasicBlock extends BasicBlock {
  render() {
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
    // console.log(arrAttributes);
    const productId =
      this.props.product.id === '' ? 'xbox-series-s' : this.props.product.id;
    const symbolCurrency = this.props.currentCurrency;
    // console.log(productId, symbolCurrency);
    // console.log(arrAttributes);
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>{this.props.product.brand}</h2>
        </div>

        <div className={styles.name}>
          <h3>{this.props.product.name}</h3>
        </div>

        <CommonAttributeSet
          attributes={arrAttributes}
          productID={this.props.product.id}
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

export default CardBasicBlock;
