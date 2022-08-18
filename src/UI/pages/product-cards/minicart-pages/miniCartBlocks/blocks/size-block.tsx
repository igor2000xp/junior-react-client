import React, { Component } from 'react';
import stylesSize from './size-block.module.css';

class SizeBlock extends Component {
  render() {
    return (
      <section className={stylesSize.sizeBlock}>
        <h4>Size:</h4>
        <div className={stylesSize.sizeLine}>
          <div className={stylesSize.sizeItem}>
            <p>XS</p>
          </div>
          <div className={`${stylesSize.sizeItem} ${stylesSize.active}`}>
            <p>S</p>
          </div>
          <div className={stylesSize.sizeItem}>
            <p>M</p>
          </div>
          <div className={stylesSize.sizeItem}>
            <p>L</p>
          </div>
        </div>
      </section>
    );
  }
}

export default SizeBlock;
