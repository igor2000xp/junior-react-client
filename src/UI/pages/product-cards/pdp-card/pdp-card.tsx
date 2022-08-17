import React, { Component } from 'react';
import styles from './pdp-card.module.css';
import BasicBlock from './cartBlocks/basic-block';
import ButtonBlock from './cartBlocks/button-block';
import TextBlock from './cartBlocks/text-block';

class PdpCard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <section className={styles.leftBlock}>
          <div className={styles.smallImage}>
            <img src="" alt="small image" />
          </div>
          <div className={styles.smallImage}>
            <img src="" alt="small image" />
          </div>
          <div className={styles.smallImage}>
            <img src="" alt="small image" />
          </div>
        </section>
        <section className={styles.imageBlock}>
          <img src="" alt="big image" />
        </section>
        <section className={styles.rightBlock}>
          <BasicBlock />
          <ButtonBlock />
          <TextBlock />
        </section>
      </div>
    );
  }
}

export default PdpCard;
