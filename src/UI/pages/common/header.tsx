import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
// import img from '../../../data/images/Icon/dolars.svg'

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <li>
              <Link className={styles.link} to="/">
                WOMEN
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/tech">
                MEN
              </Link>
            </li>
            <li className={styles.chosenLink}>
              <Link className={styles.link} to="/clothes">
                KIDS
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}></div>
        <div className={styles.basketCorner}>
          <div className={styles.currency}></div>
          <div className={styles.basket}></div>
        </div>
      </div>
    );
  }
}

export default Header;
