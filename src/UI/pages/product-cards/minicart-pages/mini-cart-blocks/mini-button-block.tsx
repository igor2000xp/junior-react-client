import React, { Component } from 'react';
import stylesButtons from './mini-button-block.module.css';
import { Link } from 'react-router-dom';

class MiniButtonBlock extends Component {
  render() {
    return (
      <section className={stylesButtons.wrapper}>
        <Link to={'/cart'}>
          <button
            className={`${stylesButtons.viewButton} ${stylesButtons.miniButton}`}
          >
            View bag
          </button>
        </Link>
        <Link to={'/'}>
          <button
            className={`${stylesButtons.checkButton} ${stylesButtons.miniButton}`}
          >
            CHECK
          </button>
        </Link>
      </section>
    );
  }
}

export default MiniButtonBlock;
