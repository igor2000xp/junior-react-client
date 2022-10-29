import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import CommonAttributeSet from '../../../common/common-bloks/common-attribute-set/common-attribute-set';
import { IProductAttribute, IBasicBlockProps, priceInit } from '../../../common-models';

type IProps = Readonly<IBasicBlockProps>;

class BasicBlock extends Component<IProps> {
  render() {
    // console.log(this.props.product.prices);
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
    const prices = Array.isArray(this.props.product.prices) ? this.props.product.prices : [this.props.product.prices];
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
            <PriceBlock
              prices={prices}
              // id={this.props.product.id}
              // symbolCurrency={this.props.currentCurrency}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default BasicBlock;
