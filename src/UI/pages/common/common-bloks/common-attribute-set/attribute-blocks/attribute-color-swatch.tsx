import React, { Component } from 'react';
import stylesColor from './attribute-color-swatch.module.css';
import { IAttribute } from '../common-attribute-set';

export interface IProps {
  colorAttribute: IAttribute;
}

class AttributeColorSwatch extends Component<IProps> {
  render() {
    const attr = this.props.colorAttribute.items;
    return (
      <>
        <div className={stylesColor.colorBlock}>
          <h4>{`${this.props.colorAttribute.name}:`}</h4>
          <div className={stylesColor.colorLine}>
            {attr.map((item) => {
              const color: string = item.value as string;
              return (
                <div className={`${stylesColor.colorItem} `} key={item.id}>
                  <div
                    className={`${stylesColor.colorItemInside}`}
                    style={{ background: `${color}` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default AttributeColorSwatch;
