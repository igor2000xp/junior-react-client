import React, { Component } from 'react';
import classes from './product-small-card.module.css';

export class ProductSmallCard extends Component {
  render() {
    return (
      <section className={classes.card}>
        <div className={classes.imageWrapper}>
          <img src="" alt="product image" />
        </div>
        <article className={classes.textBlock}>
          <div className={classes.nameBlock}>
            <p>Apollo Running Short</p>
          </div>
          <div className={classes.priceBlock}>
            <p>$50.0</p>
          </div>
        </article>
      </section>
    );
  }
}
