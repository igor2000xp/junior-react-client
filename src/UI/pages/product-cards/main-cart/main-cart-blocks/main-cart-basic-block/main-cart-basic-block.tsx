import React from 'react';
import styles from './main-cart-basic-block.module.css';
import BasicBlock  from '../../../pdp-card/pdp-card-blocks/basic-block';
import { IBasicBlockProps, IProductAttribute } from '../../../../common-models';
import PriceBlock from '../../../../common/common-bloks/price-block/price-block';
import MainCartCommonAttributeSet from '../main-cart-common-atribute-set/main-cart-common-attribute-set';

type IProps = Readonly<IBasicBlockProps>;
// type IState = Readonly<IBasicBlockState>;



class MainCartBasicBlock extends BasicBlock {
  constructor(props:IProps) {
    super(props);
  }

  // componentDidMount() {
  //   super.componentDidMount();
  // }
  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
  //   super.componentDidUpdate(prevProps, prevState, snapshot);
  //   console.log(this.state.id);
  // }

  render() {
    const arrAttributes = this.props.modifiedProduct.attributes as IProductAttribute[];
    // console.log('MainCartBasicBlock', this.id);
    // const productId =
    //   this.props.id === '' ? '' : this.props.modifiedProduct.id;
    const isEmpty: boolean = this.props.id === '';
    // console.log(isEmpty);
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
            // productID={productId}
            modifiedProducts={this.props.modifiedAttrProducts}
          />
        </section>
      </article>
    );
  }
}

export default MainCartBasicBlock;
