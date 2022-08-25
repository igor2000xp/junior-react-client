import React, { Component } from 'react';
import classes from './product-small-card.module.css';
import { IItem } from '../../main-page-madel/main-page.model';

interface IProps {
  item: IItem;
}

export class ProductSmallCard extends Component<IProps, any> {
  private id: string;
  private gallery: string;
  private readonly name: string;

  constructor(props: IProps) {
    super(props);
    this.id = props.item.id;
    this.gallery = '';
    this.name = this.props.item.name;
  }

  render() {
    const name = this.props.item.name;
    const firstGallery = this.props.item.gallery;
    if (
      typeof firstGallery === 'undefined' &&
      this.props.item.gallery === null
    ) {
      this.gallery = '';
    } else if (Array.isArray(firstGallery))
      this.gallery = firstGallery[0] !== null ? firstGallery[0] : '';

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
            <p>$50.0</p>
          </div>
        </article>
      </section>
    );
  }
}
