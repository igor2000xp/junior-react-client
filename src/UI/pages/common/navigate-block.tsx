import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { INavigateState, navigateStateInit } from './models/header.model';
import stylesNav from './navigate-block.module.css';
import client from '../../../graphql/apollo';
import { GetAllCategoriesDocument } from '../../../graphql/generated';

export interface ICategory {
  name: string;
}

export interface ICategoryWithActive {
  name: string;
  isActive: boolean;
}
export const categoriesInit = [
  { name: 'all', isActive: true },
  { name: 'tech', isActive: false },
  { name: 'clothes', isActive: false },
];

class NavigateBlock extends Component {
  // private active = { ...navigateStateInit };
  private categories = categoriesInit;

  constructor(props: any) {
    super(props);
    // this.state = { ...navigateStateInit };
    // export const navigateStateInit = {
    //   activeAll: '',
    //   activeTech: '',
    //   activeClothes: '',
    // };
    this.chosenHandler = this.chosenHandler.bind(this);
  }

  async componentDidMount() {
    const urlString = window.location.pathname.split(':');
    if (urlString[0] === '/category/') this.newSwitch(urlString[1]);
    this.categories = [...(await this.myQuery())];
    this.categories = this.categories.map((item) => {
      const newIsActive = item.name === urlString[1];
      return { name: item.name, isActive: newIsActive };
    });
  }

  async myQuery() {
    const { data } = await client.query({
      query: GetAllCategoriesDocument,
    });
    const cat: ICategory[] = data.categories as ICategory[];
    const categories: Array<ICategoryWithActive> = cat.map((item) => {
      return { name: item.name, isActive: false };
    });
    return categories;
  }

  // categoryClean = () => {
  //   this.active = { ...navigateStateInit };
  // };

  newSwitch(category: string) {
    this.categories = this.categories.map((item) => {
      const newActive = item.name === category;
      return { name: item.name, isActive: newActive };
    });
  }

  // categorySwitch = (category: string) => {
  //   switch (category) {
  //     case 'all':
  //       this.active.activeAll = stylesNav.chosenLink;
  //       break;
  //     case 'tech':
  //       this.active.activeTech = stylesNav.chosenLink;
  //       break;
  //     case 'clothes':
  //       this.active.activeClothes = stylesNav.chosenLink;
  //       break;
  //   }
  //   this.setState(() => {
  //     return (this.state = { ...this.active });
  //   });
  // };

  chosenHandler(category: string) {
    return () => {
      // this.categoryClean();
      // this.categorySwitch(category);
      this.newSwitch(category);
    };
  }

  render() {
    const chosenLink = stylesNav.chosenLink;
    return (
      <>
        <nav className={stylesNav.navigation}>
          <ul className={stylesNav.menu}>
            {/*<li*/}
            {/*  onClick={this.chosenHandler('all')}*/}
            {/*  className={this.state.activeAll}*/}
            {/*>*/}
            {/*  <Link className={stylesNav.link} to="/category/:all">*/}
            {/*    all*/}
            {/*  </Link>*/}
            {/*</li>*/}

            {/*<li*/}
            {/*  onClick={this.chosenHandler('tech')}*/}
            {/*  className={this.state.activeTech}*/}
            {/*>*/}
            {/*  <Link className={stylesNav.link} to="/category/:tech">*/}
            {/*    tech*/}
            {/*  </Link>*/}
            {/*</li>*/}

            {/*<li*/}
            {/*  onClick={this.chosenHandler('clothes')}*/}
            {/*  className={this.state.activeClothes}*/}
            {/*>*/}
            {/*  <Link className={stylesNav.link} to="/category/:clothes">*/}
            {/*    clothes*/}
            {/*  </Link>*/}
            {/*</li>*/}

            {this.categories.map((item) => {
              return (
                <li
                  onClick={this.chosenHandler(item.name)}
                  className={item.isActive ? chosenLink : ''}
                  key={item.name}
                >
                  <Link
                    className={stylesNav.link}
                    to={`/category/:${item.name}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default NavigateBlock;
