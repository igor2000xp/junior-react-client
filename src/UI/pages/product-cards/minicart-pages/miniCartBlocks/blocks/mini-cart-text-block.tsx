import React from 'react';
import stylesSize from './mini-cart-text-block.module.css';
import AttrTextPlp from '../../../plp-card/plp-card-blocks/attr-text-plp/attr-text-plp';
// import stylesAttr from '../../../plp-card/plp-card-blocks/attr-text-plp/attr-text-plp.module.css';

class MiniCartTextBlock extends AttrTextPlp {
  render() {
    const attr = this.props.attribute.items;
    return (
      <section className={stylesSize.sizeBlock}>
        <div className={stylesSize.blockHeader}>
          <h4>{`${this.props.attribute.name}:`}</h4>
        </div>
        <div className={stylesSize.sizeLine}>
          {attr.map((item) => {
            const active =
              item.id === this.state.activeAttributes.id
                ? stylesSize.active
                : '';
            return (
              <div
                className={`${stylesSize.sizeItem} ${active}`}
                key={item.id}
                onClick={() => this.choiceHandle(item)}
              >
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default MiniCartTextBlock;
