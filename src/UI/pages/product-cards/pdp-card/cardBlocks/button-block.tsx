import React, { Component } from 'react';
import styles from './button-block.module.css';
import { IActiveAttrPdp, localBasketItemInit } from '../../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../constants';
import { Link } from 'react-router-dom';
import {
  getActiveAttrFromLocal,
  getFromLocalBasket,
  settleFullBasket,
} from './helpers';

interface IProps {
  inStock: boolean;
}

class ButtonBlock extends Component<IProps> {
  private isGoToBasket = false;
  private localBaskets = [localBasketItemInit];
  private productId = location.pathname.split(':')[1];
  constructor(props: any) {
    super(props);
    this.clickToOut = this.clickToOut.bind(this);
  }

  clickToOut() {
    if (this.props.inStock) this.isGoToBasket = true;
  }

  async goToBasket() {
    const activeAttr: IActiveAttrPdp[] = await getActiveAttrFromLocal();
    const productId = this.productId;
    this.localBaskets = await getFromLocalBasket();
    if (
      !this.localBaskets[0].productId &&
      this.localBaskets[0].productId !== '' &&
      !this.localBaskets
    ) {
      console.log('Check if the basket was empty then init it');
      this.localBaskets = [
        {
          quantity: 1,
          productId,
          activeAttributes: activeAttr,
        },
      ];
    }
    // Other cart checks
    this.localBaskets = settleFullBasket(
      this.localBaskets,
      activeAttr,
      this.productId,
    );
    localStorage.setItem(LOCAL_BASKET, JSON.stringify(this.localBaskets));
  }

  async componentWillUnmount() {
    if (this.isGoToBasket) await this.goToBasket();
    localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
  }

  render() {
    const linkOut = this.props.inStock ? '/' : '';
    const buttonOut = this.props.inStock ? '' : styles.notActive;
    return (
      <div onClick={this.clickToOut}>
        <Link to={linkOut}>
          <button className={`${styles.wrapper} ${buttonOut}`}>
            <h2>ADD TO CART</h2>
          </button>
        </Link>
      </div>
    );
  }
}

export default ButtonBlock;
