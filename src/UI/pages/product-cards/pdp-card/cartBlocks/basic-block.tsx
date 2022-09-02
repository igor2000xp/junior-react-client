import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import { IProduct } from '../models/pdp-card.model';
import { SymbolCurrency } from '../../../common/models/header.model';
import CommonAttributeSet, {
  IAttribute,
} from '../../../common/common-bloks/common-attribute-set/common-attribute-set';

interface IProps {
  product: IProduct;
  currentCurrency: SymbolCurrency;
}

class BasicBlock extends Component<IProps> {
  render() {
    const arrAttributes = this.props.product.attributes as IAttribute[];
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>{this.props.product.brand}</h2>
        </div>

        <div className={styles.name}>
          <h3>{this.props.product.name}</h3>
        </div>

        <CommonAttributeSet attributes={arrAttributes} />

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
