import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesNav from './navigate-block.module.css';
import client from '../../../graphql/apollo';
import { GetAllCategoriesDocument } from '../../../graphql/generated';
import {
  categoriesInit,
  ICategory,
  ICategoryWithActive,
} from './models/header.model';

class NavigateBlock extends Component {
  private categories = categoriesInit;

  constructor(props: any) {
    super(props);
    this.chosenHandler = this.chosenHandler.bind(this);
  }

  async componentDidMount() {
    const urlString = window.location.pathname.split(':');
    if (urlString[0] === '/category/') this.categorySwitch(urlString[1]);
    this.categories = [...(await this.myQuery())];
    this.categories = this.categories.map((item) => {
      const isActive = item.name === urlString[1];
      return { ...item, isActive };
    });
  }

  async myQuery() {
    const { data } = await client.query({
      query: GetAllCategoriesDocument,
    });
    const cat: ICategory[] = data.categories as ICategory[];
    const categories: Array<ICategoryWithActive> = cat.map((item) => {
      return { ...item, isActive: false };
    });
    return categories;
  }

  categorySwitch(category: string) {
    this.categories = this.categories.map((item) => {
      const isActive = item.name === category;
      return { ...item, isActive };
    });
  }

  chosenHandler(category: string) {
    return () => {
      this.categorySwitch(category);
    };
  }

  render() {
    const chosenLink = stylesNav.chosenLink;
    return (
      <>
        <nav className={stylesNav.navigation}>
          <ul className={stylesNav.menu}>
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
