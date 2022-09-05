import React, { Component } from 'react';
import styles from './pdp-card.module.css';
import BasicBlock from './cartBlocks/basic-block';
import ButtonBlock from './cartBlocks/button-block';
import TextBlock from './cartBlocks/text-block';
import Header from '../../common/header';
import client from '../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../graphql/generated';
import { LOCAL_CURRENT_CURRENCY } from '../../../../constants';
import {
  IProduct,
  Label,
  productInit,
  SymbolCurrency,
  IPdpCardState,
  IPdpCardStateInit,
} from '../../common-models';

type IState = Readonly<IPdpCardState>;

class PdpCard extends Component<any, IState> {
  product: IProduct;
  constructor(props: any) {
    super(props);
    this.state = { ...IPdpCardStateInit };
    this.getCurrency = this.getCurrency.bind(this);
    this.switchImage = this.switchImage.bind(this);
    this.product = { ...productInit };
  }

  async componentDidMount() {
    const id = window.location.pathname.split(':')[1];
    await this.productQuery(id);
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

  async productQuery(id: string) {
    try {
      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: { id },
      });
      this.product = { ...(data.product as IProduct), id };
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

  async getCurrency(label: Label, symbol: SymbolCurrency) {
    await this.setState(() => {
      return {
        currentCurrency: symbol,
      };
    });
  }

  handleToCart() {
    console.log('to cart');
  }

  render() {
    const bigImage = this.state.bigImage;
    const hidden = this.product.gallery.length === 1 ? styles.hidden : '';
    return (
      <article className={styles.wrapperWithHeader}>
        <Header getCurrency={this.getCurrency} />

        <div className={styles.wrapper}>
          <section className={`${styles.leftBlock} ${hidden}`}>
            {this.product.gallery.map((item, index) => {
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

          <section className={styles.imageBlock}>
            <img src={bigImage} alt="product image" />
          </section>

          <section className={styles.rightBlock}>
            <BasicBlock
              product={this.product}
              currentCurrency={this.state.currentCurrency}
            />
            <ButtonBlock />
            <TextBlock text={this.product.description} />
          </section>
        </div>
      </article>
    );
  }
}

export default PdpCard;
