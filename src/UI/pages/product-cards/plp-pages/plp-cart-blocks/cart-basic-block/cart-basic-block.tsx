import React, { Component } from 'react';
import styles from './cart-basic-block.module.css';
import BasicBlock from '../../../pdp-card/cartBlocks/basic-block';
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

class CartBasicBlock extends BasicBlock {
  render() {
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
    console.log(arrAttributes);
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
          <h4>PRICE:</h4>
          <div>
            {/*<PriceBlock*/}
            {/*  id={this.props.product.id}*/}
            {/*  symbolCurrency={this.props.currentCurrency}*/}
            {/*/>*/}
          </div>
        </div>
      </article>
    );
  }
}

export default CartBasicBlock;
