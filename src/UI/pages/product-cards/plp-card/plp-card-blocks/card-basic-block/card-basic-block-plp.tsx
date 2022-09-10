import React, { Component } from 'react';
import styles from './card-basic-block-plp.module.css';
import BasicBlock from '../../../pdp-card/cardBlocks/basic-block';
import {
  IActiveBasketAttr, IAttrActive, IBasicBlockProps,
  ICartBasicBlockProps,
  IProduct,
  IProductAttribute,
  SymbolCurrency,
} from '../../../../common-models';
import CommonAttributeSet from '../../../../common/common-bloks/common-attribute-set/common-attribute-set';
import PriceBlock from '../../../../common/common-bloks/price-block/price-block';
import CommonAttributeSetPlp from '../common-atribute-set-plp/common-attribute-set-plp';

// export interface ICartBasicBlockProps extends IBasicBlockProps {
//   activeAttributes: IActiveBasketAttr;
// }
// export interface IActiveBasketAttr {
//   productId: string;
//   activeAttributes: IAttrActive[];
// }
// export interface IAttrActive{
//   id: string;
//   value: string;
//   attrID: string;
// }

// type IProps = Readonly<IBasicBlockProps>;


class CardBasicBlockPlp extends BasicBlock {
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

        <CommonAttributeSetPlp
          attributes={arrAttributes}
          productID={productId}
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

export default CardBasicBlockPlp;
