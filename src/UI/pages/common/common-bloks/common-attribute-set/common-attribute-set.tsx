import React, { Component } from 'react';
// import stylesAttr from './common-attribute-set.module.css';
import AttributeText from './attribute-blocks/attribute-text';
import AttributeColorSwatch from './attribute-blocks/attribute-color-swatch';

class CommonAttributeSet extends Component {
  render() {
    return (
      <>
        <AttributeText />
        <AttributeColorSwatch />
      </>
    );
  }
}

export default CommonAttributeSet;
