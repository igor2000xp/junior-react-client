import React, { Component } from 'react';
import styles from './product-small-card.module.css';
import PriceBlock from '../../common/common-bloks/price-block/price-block';
import { IProduct, SymbolCurrency, IPrice } from '../../common-models';
import cartImage from '../../../../assets/images/Icon/CircleIcon.svg';

interface IProps {
  item: IProduct;
  symbolCurrency: SymbolCurrency;
}

export class ProductSmallCard extends Component<IProps, any> {
  private id: string;
  private gallery: string;
  private readonly name: string;
  private brand: string;
  private price: IPrice | IPrice[];

  constructor(props: IProps) {
    super(props);
    this.id = props.item.id;
    this.gallery = '';
    this.name = this.props.item.name;
    this.brand = this.props.item.brand;
    this.price = this.props.item.prices;
  }

  render() {
    const name = `${this.props.item.brand} ${this.props.item.name}`;
    const firstGallery = this.props.item.gallery;
    if (!this.props.item.gallery) {
      this.gallery = '';
    } else if (Array.isArray(firstGallery))
      this.gallery = firstGallery[0] ? firstGallery[0] : '';
    const id = this.props.item.id;
    const outStore = !this.props.item.inStock
      ? styles.outStore
      : styles.greenButtonCart;

    return (
      <section className={styles.card}>
        <div className={styles.imageWrapper}>
          <div className={styles.bigImage}>
            <img src={this.gallery} alt="product image" />
          </div>
        </div>
        <div className={outStore}>
          <img src={cartImage} alt="to Cart button" />
        </div>
        <article className={styles.textBlock}>
          <div className={styles.nameBlock}>
            <p>{name}</p>
          </div>
          <div className={styles.priceBlock}>
            <PriceBlock id={id} symbolCurrency={this.props.symbolCurrency} />
          </div>
        </article>
      </section>
    );
  }
}
