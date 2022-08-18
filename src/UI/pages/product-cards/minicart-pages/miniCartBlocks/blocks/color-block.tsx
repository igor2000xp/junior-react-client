import React, { Component } from 'react';
import stylesColor from './color-block.module.css';

class ColorBlock extends Component {
  render() {
    return (
      <section className={stylesColor.colorBlock}>
        <h4>Color:</h4>
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
      </section>
    );
  }
}

export default ColorBlock;
