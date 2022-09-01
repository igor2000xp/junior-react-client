import React, { Component } from 'react';
import styles from './basic-block.module.css';
import PriceBlock from '../../../common/common-bloks/price-block/price-block';
import { IProduct } from '../models/pdp-card.model';
import { SymbolCurrency } from '../../../common/models/header.model';

interface IProps {
  product: IProduct;
  currentCurrency: SymbolCurrency;
}

class BasicBlock extends Component<IProps> {
  // constructor(props: IProps) {
  //   super(props);
  // }

  // async componentDidMount() {
  //   await const { data } = client.query({
  //     query: useGetProductByIdQuery,
  //     variables: {
  //       i
  //     }
  //   })
  // }

  render() {
    // console.log(this.props.product.prices);
    console.log(this.props.product.id);
    console.log(this.props.currentCurrency);
    // const arrPrises: IPrice[] = this.props.product.prices;
    // const prises: IPrice | IPrice[] =
    //   this.props.product.prices.length === 1
    //     ? this.props.product.prices[0]
    //     : this.props.product.prices;
    // const prises = this.props.product.prices;
    // console.log(prises);
    return (
      <article className={styles.wrapper}>
        <div className={styles.brand}>
          <h2>{this.props.product.brand}</h2>
        </div>

        <div className={styles.name}>
          <h3>{this.props.product.name}</h3>
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
            {/*<h5>$50.0</h5>*/}
            <PriceBlock
              id={this.props.product.id}
              symbolCurrency={this.props.currentCurrency}
            />
          </div>
        </div>
      </article>
    );
  }
}

export default BasicBlock;
