import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import CommonAttributeSet from '../../../common/common-bloks/common-attribute-set/common-attribute-set';
import { IProductAttribute, IBasicBlockProps } from '../../../common-models';

type IProps = Readonly<IBasicBlockProps>;

class BasicBlock extends Component<IProps> {
  render() {
    const arrAttributes = this.props.product.attributes as IProductAttribute[];
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
              id={this.props.product.id}
              symbolCurrency={this.props.currentCurrency}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default BasicBlock;
