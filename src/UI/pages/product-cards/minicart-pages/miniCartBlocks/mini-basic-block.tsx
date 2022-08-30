import React, { Component } from 'react';
import stylesMBlock from './mini-basic-block.module.css';
import NameBlock from './blocks/name-block';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import SizeBlock from './blocks/size-block';
import ColorBlock from './blocks/color-block';
import ImageBlock from './blocks/image-block';

class MiniBasicBlock extends Component {
  render() {
    return (
      <article className={stylesMBlock.wrapper}>
        <section className={stylesMBlock.leftSide}>
          <NameBlock />
          <h5>$80.0</h5>
          {/*<PriceBlock />*/}
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
