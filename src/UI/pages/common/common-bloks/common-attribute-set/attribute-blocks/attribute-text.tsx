import React, { Component } from 'react';
import stylesAttr from './attribute-text.module.css';
import { IAttribute } from '../common-attribute-set';

export interface IProps {
  textAttribute: IAttribute;
}

class AttributeText extends Component<IProps> {
  render() {
    console.log(this.props.textAttribute);
    const attr = this.props.textAttribute.items;
    return (
      <div className={stylesAttr.sizeBlock}>
        <h4>{`${this.props.textAttribute.name}:`}</h4>
        <div className={stylesAttr.sizeLine}>
          {attr.map((item) => {
            return (
              <div className={stylesAttr.sizeItem} key={item.id}>
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AttributeText;
