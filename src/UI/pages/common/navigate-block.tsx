import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesNav from './navigate-block.module.css';
import client from '../../../graphql/apollo';
import { GetAllCategoriesDocument } from '../../../graphql/generated';
import {
  categoriesInit,
  ICategory,
  ICategoryWithActive,
} from '../common-models';
import { State } from '../../../store/store';
import { setPage } from '../../../store/pagesSlice';
import { connect } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

const mapStateToProps = (state:State) => {
  return { page: state.pages.page };
};
const  mapDispatchToProps = { setPage };

export interface INavigateBlockProps {
  page?: string;
  setPage: ActionCreatorWithPayload<string, string>;
}

type IProps = Readonly<INavigateBlockProps>;

class NavigateBlock extends Component<IProps> {
  private categories = categoriesInit;

  constructor(props: IProps) {
    super(props);
    this.chosenHandler = this.chosenHandler.bind(this);
  }

  async componentDidMount() {
    const urlString = location.pathname.split(':');
    if (urlString[0] === '/category/') this.categorySwitch(urlString[1]);
    this.categories = [...(await this.myQuery())];
    this.categories = this.categories.map((item) => {
      const isActive = item.name === urlString[1];
      if (item.name === urlString[1]) {
        this.props.setPage(urlString[1]);
      }
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
    this.props.setPage(category);
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
    return (
      <>
        <nav className={stylesNav.navigation}>
          <ul className={stylesNav.navMenu}>
            {this.categories.map((item) => {
              return (
                <li
                  onClick={this.chosenHandler(item.name)}
                  className={item.isActive ? stylesNav.chosenBorder : ''}
                  key={item.name}
                >
                  <Link
                    className={`${stylesNav.navLink} ${
                      item.isActive ? stylesNav.chosenLink : ''
                    }`}
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



export default connect(mapStateToProps, mapDispatchToProps)(NavigateBlock);
