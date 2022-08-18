import React, { Component } from 'react';
import stylesMBlock from './mini-basic-block.module.css';
import NameBlock from './blocks/name-block';
import PriceBlock from './blocks/price-block';
import SizeBlock from './blocks/size-block';
import ColorBlock from './blocks/color-block';
import ImageBlock from './blocks/image-block';

class MiniBasicBlock extends Component {
  render() {
    return (
      <article className={stylesMBlock.wrapper}>
        <section className={stylesMBlock.leftSide}>
          <NameBlock />
          <PriceBlock />
          <SizeBlock />
          <ColorBlock />
        </section>

        <section className={stylesMBlock.rightSide}>
          <ImageBlock />
        </section>
      </article>
    );
  }
}

export default MiniBasicBlock;
