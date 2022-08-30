import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';

class BasicBlock extends Component {
  render() {
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>Apollo</h2>
        </div>

        <div className={styles.name}>
          <h3>Running Short</h3>
        </div>

        <div className={styles.sizeBlock}>
          <h4>SIZE:</h4>
          <div className={styles.sizeLine}>
            <div className={styles.sizeItem}>
              <p>XS</p>
            </div>
            <div className={`${styles.sizeItem} ${styles.active}`}>
              <p>S</p>
            </div>
            <div className={styles.sizeItem}>
              <p>M</p>
            </div>
            <div className={styles.sizeItem}>
              <p>L</p>
            </div>
          </div>
        </div>

        <div className={styles.colorBlock}>
          <h4>COLOR:</h4>
          <div className={styles.colorLine}>
            <div className={`${styles.colorItem} ${styles.activeColor}`}>
              <div
                className={`${styles.colorItemInside} ${styles.itemGrey}`}
              ></div>
            </div>
            <div className={`${styles.colorItem}`}>
              <div
                className={`${styles.colorItemInside} ${styles.itemDarkGray}`}
              ></div>
            </div>
            <div className={`${styles.colorItem}`}>
              <div
                className={`${styles.colorItemInside} ${styles.itemGreen}`}
              ></div>
            </div>
          </div>
        </div>

        <div className={styles.priceBlock}>
          <h4>PRICE:</h4>
          <div>
            <h5>$50.0</h5>
            {/*<PriceBlock />*/}
          </div>
        </div>
      </article>
    );
  }
}

export default BasicBlock;
