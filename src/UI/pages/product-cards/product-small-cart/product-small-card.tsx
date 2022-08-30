import React, { Component } from 'react';
import classes from './product-small-card.module.css';
import { IItem, IPrice } from '../../main-page-madel/main-page.model';
import PriceBlock from '../../common/common-bloks/price-block/price-block';
import { SymbolCurrency } from '../../common/models/header.model';

interface IProps {
  item: IItem;
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
    const price = this.props.item.prices;

    return (
      <section className={classes.card}>
        <div className={classes.imageWrapper}>
          <img src={this.gallery} alt="product image" />
        </div>
        <article className={classes.textBlock}>
          <div className={classes.nameBlock}>
            <p>{name}</p>
          </div>
          <div className={classes.priceBlock}>
            <PriceBlock
              price={price}
              symbolCurrency={this.props.symbolCurrency}
            />
          </div>
        </article>
      </section>
    );
  }
}
