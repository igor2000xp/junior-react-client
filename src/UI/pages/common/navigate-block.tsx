import React, { Component } from 'react';
// import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { IState, StateInit } from './header-model';
import stylesNav from './navigate-block.module.css';

class NavigateBlock extends Component<any, IState> {
  private active = { ...StateInit };

  constructor(props: any) {
    super(props);
    this.state = { ...StateInit };
    this.chosenHandler = this.chosenHandler.bind(this);
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
        this.active.activeAll = stylesNav.chosenLink;
        break;
      case 'tech':
        this.active.activeTech = stylesNav.chosenLink;
        break;
      case 'clothes':
        this.active.activeClothes = stylesNav.chosenLink;
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
      <>
        <nav className={stylesNav.navigation}>
          <ul className={stylesNav.menu}>
            <li
              onClick={this.chosenHandler('all')}
              className={this.state.activeAll}
            >
              <Link className={stylesNav.link} to="/category/:all">
                all
              </Link>
            </li>

            <li
              onClick={this.chosenHandler('tech')}
              className={this.state.activeTech}
            >
              <Link className={stylesNav.link} to="/category/:tech">
                tech
              </Link>
            </li>

            <li
              // className={styles.chosenLink}
              onClick={this.chosenHandler('clothes')}
              className={this.state.activeClothes}
            >
              <Link className={stylesNav.link} to="/category/:clothes">
                clothes
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default NavigateBlock;
