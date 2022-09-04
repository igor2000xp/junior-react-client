import React from 'react';
import AttributeColorSwatch from './attribute-color-swatch';
import stylesAttr from './attribute-text.module.css';
import { IProps } from './attribute-color-swatch';

class AttributeTextExtended extends AttributeColorSwatch {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const attr = this.props.attribute.items;
    return (
      <div className={stylesAttr.sizeBlock}>
        <h4>{`${this.props.attribute.name}:`}</h4>
        <div className={stylesAttr.sizeLine}>
          {attr.map((item) => {
            const active =
              item.id === this.state.activeAttributes.id
                ? stylesAttr.active
                : '';
            return (
              <div
                className={`${stylesAttr.sizeItem} ${active}`}
                key={item.id}
                onClick={() => this.choiceHandle(item)}
              >
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AttributeTextExtended;
