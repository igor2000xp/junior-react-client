import React, { Component } from 'react';
import stylesSize from './mini-cart-text-block.module.css';
import AttrTextPlp from '../../../plp-card/plp-card-blocks/attr-text-plp/attr-text-plp';

class MiniCartTextBlock extends AttrTextPlp {
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

export default MiniCartTextBlock;
