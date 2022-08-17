import React, { Component } from 'react';
import styles from './cart-page.module.css';
import BasicBlock from '../../pdp-card/cartBlocks/basic-block';
// import '../../../../../data/images/Icon/right-arrow-next-svgrepo-com.svg'

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
              <button className={`${styles.arrow} ${styles.arrowLeft}`}>
                <div className={`${styles.arrowSvgLeft}`}></div>
              </button>
              <button className={`${styles.arrow} ${styles.arrowRight}`}>
                <div className={`${styles.arrowSvgRight}`}></div>
              </button>
            </div>
          </section>
        </aside>
      </article>
    );
  }
}

export default CartPage;
