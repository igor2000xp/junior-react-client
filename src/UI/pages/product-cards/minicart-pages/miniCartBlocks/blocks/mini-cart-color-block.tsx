import React from 'react';
import stylesColor from './mini-cart-color-block.module.css';
import AttrColorPlp from '../../../plp-card/plp-card-blocks/attr-color-plp/attr-color-plp';

class MiniCartColorBlock extends AttrColorPlp {
  render() {
    const attr = this.props.attribute.items;
    return (
      <section className={stylesColor.colorBlock}>
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
      </section>
    );
  }
}

export default MiniCartColorBlock;
