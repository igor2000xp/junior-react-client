import React, { Component } from 'react';
import styles from './text-block.module.css';

class TextBlock extends Component {
  render() {
    return (
      <article className={styles.wrapper}>
        <p>
          Find stunning women's cocktail dresses and party dresses. Stand out in
          lace and metallic cocktail dresses and party dresses from all your
          favorite brands.
        </p>
      </article>
    );
  }
}

export default TextBlock;
