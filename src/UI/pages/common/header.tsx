import React, { Component } from 'react';
import styles from './header.module.css';
import NavigateBlock from './navigate-block';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <NavigateBlock />
        <div className={styles.logo} />
        <div className={styles.basketCorner}>
          <div className={styles.currency} />
          <div className={styles.basket} />
        </div>
      </div>
    );
  }
}

export default Header;
