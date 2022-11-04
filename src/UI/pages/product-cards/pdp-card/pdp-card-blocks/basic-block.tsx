import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import CommonAttributeSet from '../../../common/common-bloks/common-attribute-set/common-attribute-set';
import { IProductAttribute, IBasicBlockProps } from '../../../common-models';

export interface IBasicBlockState {
  id: string;
}

type IProps = Readonly<IBasicBlockProps>;
type IState = Readonly<IBasicBlockState>;

class BasicBlock extends Component<IProps, IState> {
  protected name = '';
  protected brand = '';
  constructor(props: IProps) {
    super(props);
    this.state = { id: '' };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
    })
  }

  render() {
    const arrAttributes = this.props.modifiedProduct.attributes as IProductAttribute[];
    const prices = Array.isArray(this.props.modifiedProduct.prices) ? this.props.modifiedProduct.prices : [this.props.modifiedProduct.prices];
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>{this.props.modifiedProduct.brand}</h2>
        </div>

        <div className={styles.name}>
          <h3>{this.props.modifiedProduct.name}</h3>
        </div>

        <CommonAttributeSet
          attributes={arrAttributes}
        />

        <div className={styles.priceBlock}>
          <h4>PRICE:</h4>
          <div>
            <PriceBlock
              prices={prices}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default BasicBlock;
