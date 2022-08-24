import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { IState, StateInit } from './header-model';

class Header extends Component<any, IState, any> {
  private active = { ...StateInit };

  constructor(props: any) {
    super(props);
    this.chosenHandler = this.chosenHandler.bind(this);
    this.state = { ...StateInit };
  }

  componentDidMount() {
    const urlString = window.location.pathname.split(':');
    this.categorySwitch(urlString[1]);
  }

  categoryClean = () => {
    this.active = { ...StateInit };
  };

  categorySwitch = (category: string) => {
    switch (category) {
      case 'all':
        this.active.activeAll = styles.chosenLink;
        break;
      case 'tech':
        this.active.activeTech = styles.chosenLink;
        break;
      case 'clothes':
        this.active.activeClothes = styles.chosenLink;
        break;
    }
    this.setState(() => {
      return (this.state = { ...this.active });
    });
  };

  chosenHandler(category: string) {
    return () => {
      this.categoryClean();
      this.categorySwitch(category);
      // event.preventDefault();
    };
  }
  render() {
    return (
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <ul className={styles.menu}>
            <li
              onClick={this.chosenHandler('all')}
              className={this.state.activeAll}
            >
              <Link className={styles.link} to="/category/:all">
                all
              </Link>
            </li>

            <li
              onClick={this.chosenHandler('tech')}
              className={this.state.activeTech}
            >
              <Link className={styles.link} to="/category/:tech">
                tech
              </Link>
            </li>

            <li
              // className={styles.chosenLink}
              onClick={this.chosenHandler('clothes')}
              className={this.state.activeClothes}
            >
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
