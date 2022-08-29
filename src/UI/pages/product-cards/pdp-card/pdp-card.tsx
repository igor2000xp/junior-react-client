import React, { Component } from 'react';
import styles from './pdp-card.module.css';
import BasicBlock from './cartBlocks/basic-block';
import ButtonBlock from './cartBlocks/button-block';
import TextBlock from './cartBlocks/text-block';
import { Link } from 'react-router-dom';
import Header from '../../common/header';

class PdpCard extends Component {
  constructor(props: any) {
    super(props);
    this.getCurrency = this.getCurrency.bind(this);
  }
  getCurrency(label: string, symbol: string) {
    console.log('Get currency to plp to state');
    console.log(label, symbol);
  }
  render() {
    return (
      <>
        <Header getCurrency={this.getCurrency} />
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
            <Link to="/cart">
              <ButtonBlock />
            </Link>
            <TextBlock />
          </section>
        </div>
      </>
    );
  }
}

export default PdpCard;
