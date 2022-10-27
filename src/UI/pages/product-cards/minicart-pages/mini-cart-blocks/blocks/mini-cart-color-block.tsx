import React from 'react';
import stylesColor from './mini-cart-color-block.module.css';
import MainCartAttrColor from '../../../main-cart/main-cart-blocks/main-cart-attr-color/main-cart-attr-color';

class MiniCartColorBlock extends MainCartAttrColor {
  render() {
    const attr = this.props.attribute.items;
    return (
      <div className={stylesColor.colorBlock}>
        <h4>{`${this.props.attribute.name}:`}</h4>
        <div className={stylesColor.colorLine}>
          {attr.map((item) => {
            const color: string = item.value as string;
            const activeColor =
              item.id === this.state.activeAttributes.id
                ? stylesColor.activeColor
                : '';
            return (
              <div
                onClick={() => this.choiceHandle(item)}
                className={`${stylesColor.colorItem} ${activeColor}`}
                key={item.id}
              >
                <div
                  className={`${stylesColor.colorItemInside}`}
                  style={{ background: `${color}` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MiniCartColorBlock;