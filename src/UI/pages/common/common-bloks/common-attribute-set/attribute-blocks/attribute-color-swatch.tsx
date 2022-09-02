import React, { Component } from 'react';
import stylesColor from './attribute-color-swatch.module.css';

class AttributeColorSwatch extends Component {
  render() {
    return (
      <>
        <div className={stylesColor.colorBlock}>
          <h4>COLOR:</h4>
          <div className={stylesColor.colorLine}>
            <div
              className={`${stylesColor.colorItem} ${stylesColor.activeColor}`}
            >
              <div
                className={`${stylesColor.colorItemInside} ${stylesColor.itemGrey}`}
              ></div>
            </div>
            <div className={`${stylesColor.colorItem}`}>
              <div
                className={`${stylesColor.colorItemInside} ${stylesColor.itemDarkGray}`}
              ></div>
            </div>
            <div className={`${stylesColor.colorItem}`}>
              <div
                className={`${stylesColor.colorItemInside} ${stylesColor.itemGreen}`}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AttributeColorSwatch;
