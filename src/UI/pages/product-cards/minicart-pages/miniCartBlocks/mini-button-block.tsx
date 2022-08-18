import React, { Component } from 'react';
import stylesButtons from './mini-button-block.module.css';

class MiniButtonBlock extends Component {
  render() {
    return (
      <section className={stylesButtons.wrapper}>
        <button
          className={`${stylesButtons.viewButton} ${stylesButtons.miniButton}`}
        >
          View bag
        </button>
        <button
          className={`${stylesButtons.checkButton} ${stylesButtons.miniButton}`}
        >
          CHECK
        </button>
      </section>
    );
  }
}

export default MiniButtonBlock;
