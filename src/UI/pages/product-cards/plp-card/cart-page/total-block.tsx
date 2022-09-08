import React, { Component } from 'react';
import totalStyle from './total-block.module.css';

class TotalBlock extends Component {
  render() {
    return (
      <article className={totalStyle.totalWrapper}>
        <div className={totalStyle.totalSection}>
          <div className={totalStyle.sectionColumns}>
            <section className={totalStyle.leftTotal}>
              <p>Tax 21%:</p>
              <p>Quantity:</p>
              <div className={totalStyle.totalBold}>
                <p>Total:</p>
              </div>
            </section>
            <section className={totalStyle.rightTotal}>
              <p>$42.00</p>
              <p>3</p>
              <p>$200.00</p>
            </section>
          </div>
          <button className={totalStyle.orderButton}>
            <p>Order</p>
          </button>
        </div>
      </article>
    );
  }
}

export default TotalBlock;
