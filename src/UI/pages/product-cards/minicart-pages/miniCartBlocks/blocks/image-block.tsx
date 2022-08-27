import React, { Component } from 'react';
import stylesImage from './image-block.module.css';
import img1 from '../../../../../../assets/images/Icon/dolars.svg';

class ImageBlock extends Component {
  render() {
    return (
      <aside className={stylesImage.rightSide}>
        <section className={stylesImage.buttonSide}>
          <button className={`${stylesImage.buttonQuality}`}>
            <p className={stylesImage.plus}> </p>
          </button>
          <div className={stylesImage.numberInBasket}>
            <p>1</p>
          </div>
          <button className={stylesImage.buttonQuality}>
            <p className={stylesImage.minus}> </p>
          </button>
        </section>

        <section>
          <div className={stylesImage.imageBlock}>
            <img src={img1} alt="product image" />
          </div>
        </section>
      </aside>
    );
  }
}

export default ImageBlock;
