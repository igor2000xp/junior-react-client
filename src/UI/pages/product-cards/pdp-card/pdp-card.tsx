import React, { Component } from 'react';
import styles from './pdp-card.module.css';
import BasicBlock from './pdp-card-blocks/basic-block';
import ButtonBlock from './pdp-card-blocks/button-block';
import TextBlock from './pdp-card-blocks/text-block';
import Header from '../../common/header';
import client from '../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../graphql/generated';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../constants';
import {
  IProduct,
  productInit,
  IPdpCardState,
  IPdpCardStateInit, IModifiedProduct,
} from '../../common-models';
import { getFirstProdAttrAsActiveAttr } from './pdp-card-blocks/helpers';

type IState = Readonly<IPdpCardState>;

class PdpCard extends Component<any, IState> {
  private product: IProduct;
  constructor(props: any) {
    super(props);
    this.state = { ...IPdpCardStateInit };
    this.switchImage = this.switchImage.bind(this);
    this.product = { ...productInit };
  }

  async componentDidMount() {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    const id = location.pathname.split(':')[1];
    this.product = (await this.productQuery(id)) as IProduct;
    const activeAttrFromFirsts = getFirstProdAttrAsActiveAttr(this.product);
    this.setState({ attrActive: activeAttrFromFirsts });
    await localStorage.setItem(
      ACTIVE_PRODUCT_ATTRIBUTES,
      JSON.stringify(activeAttrFromFirsts),
    );

    const localCurrency = localStorage.getItem(LOCAL_CURRENT_CURRENCY);
    const currentCurrency = JSON.parse(
      localCurrency ? localCurrency : '',
    ).symbol;
    await this.setState(() => {
      return {
        isLoaded: true,
        bigImage: this.product.gallery[0],
        currentCurrency,
      };
    });
  }

  async productQuery(id: string): Promise<IProduct | undefined> {
    try {
      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
      });
      return data.product as IProduct;
    } catch (err) {
      console.log(`Error getting data from server ${err}`);
    }
  }

  async switchImage(index: number) {
    const i = index ? index : 0;
    const pic = this.product.gallery[i];
    this.setState(() => {
      return {
        bigImage: pic,
      };
    });
  }

  render() {
    const bigImage = this.state.bigImage;
    const product = this.product;
    const modifiedProduct:IModifiedProduct = {
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      prices: Array.isArray(this.product.prices) ? this.product.prices : [this.product.prices],
      attributes: this.product.attributes,
    };
    const outStock = !product.inStock ? styles.outStock : '';
    const hidden = product.gallery.length === 1 ? styles.hidden : '';
    return (
      <article className={styles.wrapperWithHeader}>
        <Header />

        <div className={styles.wrapper}>
          <section className={`${styles.leftBlock} ${hidden}`}>
            {product.gallery.map((item, index) => {
              return (
                <div
                  className={styles.smallImage}
                  onClick={() => this.switchImage(index)}
                  key={item + index}
                >
                  <img src={item} alt="small image" />
                </div>
              );
            })}
          </section>

          <section className={`${styles.imageBlock} ${outStock}`}>
            <img src={bigImage} alt="product image" />
          </section>

          <section className={styles.rightBlock}>
            <BasicBlock
              modifiedProduct={modifiedProduct}
              id={''}
            />
            <ButtonBlock
              inStock={product.inStock}
              product={product}
            />
            <TextBlock text={product.description} />
          </section>
        </div>
      </article>
    );
  }
}

export default PdpCard;
