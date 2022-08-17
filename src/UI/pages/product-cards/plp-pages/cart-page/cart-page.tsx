import React, { Component } from 'react';
import styles from './cart-page.module.css';
import BasicBlock from '../../pdp-card/cartBlocks/basic-block';

class CartPage extends Component {
  render() {
    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <BasicBlock />
          {/*<h2>left</h2>*/}
        </aside>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button className={`${styles.buttonQuality}`}>
              <p className={styles.plus}></p>
            </button>
            <div className={styles.numberInBasket}>
              <p>1</p>
            </div>
            <button className={styles.buttonQuality}>
              <p className={styles.minus}></p>
            </button>
          </section>

          <section>
            <div className={styles.imageBlock}>
              <img src="" alt="product image" />
            </div>
            {/*<button></button>*/}
            {/*<button></button>*/}
          </section>
        </aside>
      </article>
    );
  }
}

export default CartPage;
