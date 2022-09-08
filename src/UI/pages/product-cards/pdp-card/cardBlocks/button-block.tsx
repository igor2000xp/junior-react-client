import React, { Component } from 'react';
import styles from './button-block.module.css';
import {
  IActiveAttr,
  ILocalBasket,
  localActiveAttributesInit,
} from '../../../common-models';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
} from '../../../../../constants';
import { Link } from 'react-router-dom';
import { getActiveAttr, getLocalBasket, settleFullBasket } from './helpers';

class ButtonBlock extends Component {
  private isGoToBasket = false;
  constructor(props: any) {
    super(props);
    this.clickToOut = this.clickToOut.bind(this);
  }

  clickToOut() {
    this.isGoToBasket = true;
  }

  async goToBasket() {
    let activeAttr: IActiveAttr = await getActiveAttr();
    let currentBasket = await getLocalBasket();
    // Check if the basket was empty
    if ( (!currentBasket[0].productId && currentBasket[0].productId !== '') && !currentBasket) {
      currentBasket = [
        {
          quantity: 1,
          productId: activeAttr.productId,
          activeAttributes: [...activeAttr.activeAttributes],
        },
      ];
      // localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, '');
      // activeAttr = localActiveAttributesInit;
    }
    // Other cart checks
    this.settleBasket(currentBasket, activeAttr);
  }

  settleBasket(basket: ILocalBasket[], activeAttr: IActiveAttr) {
    // If it is a first record to the basket
    if (activeAttr.productId !== '' && !activeAttr) {
      // Check right way add goods into basket
      settleFullBasket(basket, activeAttr);
    }
    localStorage.setItem(LOCAL_BASKET, JSON.stringify(basket));
    localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, '');
  }

  async componentWillUnmount() {
    if (this.isGoToBasket) await this.goToBasket();
  }

  render() {
    return (
      <div onClick={this.clickToOut}>
        <Link to="/cart">
          <button className={styles.wrapper}>
            <h2>ADD TO CART</h2>
          </button>
        </Link>
      </div>
    );
  }
}

export default ButtonBlock;
