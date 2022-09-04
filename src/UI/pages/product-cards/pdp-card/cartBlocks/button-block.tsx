import React, { Component } from 'react';
import styles from './button-block.module.css';

// export interface IPrintToCard {}

class ButtonBlock extends Component {
  componentWillUnmount() {
    console.log('Go to card');
    // const printToCard
  }

  render() {
    return (
      <button className={styles.wrapper}>
        <h2>ADD TO CART</h2>
      </button>
    );
  }
}

export default ButtonBlock;
