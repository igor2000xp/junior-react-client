import React, { Component } from 'react';
import styles from './button-block.module.css';

class ButtonBlock extends Component {
  render() {
    return (
      <button className={styles.wrapper}>
        <h2>ADD TO CART</h2>
      </button>
    );
  }
}

export default ButtonBlock;
