import React, { Component } from 'react';
import styles from './pdp-card.module.css';
import BasicBlock from './cartBlocks/basic-block';
import ButtonBlock from './cartBlocks/button-block';
import TextBlock from './cartBlocks/text-block';
import { Link } from 'react-router-dom';
import Header from '../../common/header';
import client from '../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../graphql/generated';

export interface IState {
  isLoaded: boolean;
  bigImage: string;
}
export const stateInit = {
  isLoaded: false,
  bigImage: '',
};

export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: IAttributeSet[];
  price: IPrice[];
  brand: string;
}

export interface IAttributeSet {
  id: string;
  name: string;
  type: string;
  items: IAttribute[];
}
export interface IPrice {
  currency: string;
  amount: number;
}
export interface IAttribute {
  displayValue: string;
  value: string;
  id: string;
}
export const productInit = {
  id: '',
  name: '',
  inStock: true,
  gallery: [''],
  description: '',
  category: '',
  attributes: [
    {
      id: '',
      name: '',
      type: '',
      items: [{ displayValue: '', value: '', id: '' }],
    },
  ],
  price: Array({ currency: '', amount: 0 }),
  brand: '',
};
class PdpCard extends Component<any, IState> {
  product: IProduct;
  constructor(props: any) {
    super(props);
    this.state = { ...stateInit };
    this.getCurrency = this.getCurrency.bind(this);
    this.switchImage = this.switchImage.bind(this);
    this.product = { ...productInit };
    this.state = {
      isLoaded: true,
      bigImage: '',
    };
  }

  async componentDidMount() {
    const id = window.location.pathname.split(':')[1];
    await this.productQuery(id);
    await this.setState(() => {
      return {
        isLoaded: true,
        bigImage: this.product.gallery[0],
      };
    });
  }

  async productQuery(id: string) {
    const { data } = await client.query({
      query: GetProductByIdDocument,
      variables: { id },
    });
    this.product = { ...(data.product as IProduct), id };
  }

  getCurrency(label: string, symbol: string) {
    console.log('Get currency to plp to state');
    console.log(label, symbol);
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
            <BasicBlock product={this.product} />
            <Link to="/cart">
              <ButtonBlock />
            </Link>
            <TextBlock text={this.product.description} />
          </section>
        </div>
      </article>
    );
  }
}

export default PdpCard;
