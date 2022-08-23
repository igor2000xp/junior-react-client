import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <li>
              <Link className={styles.link} to="/category/:all">
                all
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/category/:tech">
                tech
              </Link>
            </li>
            <li className={styles.chosenLink}>
              <Link className={styles.link} to="/category/:clothes">
                clothes
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
