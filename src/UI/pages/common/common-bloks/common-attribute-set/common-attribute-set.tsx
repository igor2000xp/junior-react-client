import React, { Component } from 'react';
import AttributeText from './attribute-blocks/attribute-text';
import AttributeColorSwatch from './attribute-blocks/attribute-color-swatch';

export interface IProps {
  attributes: IAttribute[];
}
export interface IAttribute {
  id: string;
  name: string;
  type: string;
  items: IAttrItems[];
}
export interface IAttrItems {
  id: string;
  displayValue: string;
  value: string;
}

class CommonAttributeSet extends Component<IProps> {
  render() {
    const attr = this.props.attributes;
    return (
      <>
        {attr.map((item) => {
          const isText = item.type === 'text';
          const isColor = item.type === 'swatch';
          if (isText) {
            return <AttributeText textAttribute={item} key={item.id} />;
          } else if (isColor) {
            return <AttributeColorSwatch colorAttribute={item} key={item.id} />;
          } else return '';
        })}
      </>
    );
  }
}

export default CommonAttributeSet;
