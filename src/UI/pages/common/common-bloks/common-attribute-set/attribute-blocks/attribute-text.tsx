import React, { Component } from 'react';
import stylesAttr from './attribute-text.module.css';

class AttributeText extends Component {
  render() {
    return (
      <div className={stylesAttr.sizeBlock}>
        <h4>SIZE:</h4>
        <div className={stylesAttr.sizeLine}>
          <div className={stylesAttr.sizeItem}>
            <p>XS</p>
          </div>
          <div className={`${stylesAttr.sizeItem} ${stylesAttr.active}`}>
            <p>S</p>
          </div>
          <div className={stylesAttr.sizeItem}>
            <p>M</p>
          </div>
          <div className={stylesAttr.sizeItem}>
            <p>L</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AttributeText;
