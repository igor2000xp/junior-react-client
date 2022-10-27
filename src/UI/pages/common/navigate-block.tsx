import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stylesNav from './navigate-block.module.css';
import client from '../../../graphql/apollo';
import { GetAllCategoriesDocument } from '../../../graphql/generated';
import {
  categoriesInit,
  ICategory,
  ICategoryWithActive, INavigateBlockProps, INavigateBlockState,
} from '../common-models';
import { State } from '../../../store/store';
import { setPage } from '../../../store/pagesSlice';
import { connect } from 'react-redux';

const mapStateToProps = (state:State) => {
  return { page: state.pages.page };
};
const  mapDispatchToProps = { setPage };

type IProps = Readonly<INavigateBlockProps>;
type IState = Readonly<INavigateBlockState>;

class NavigateBlock extends Component<IProps, IState> {
  private categories = categoriesInit;
  private currentCategory = '';

  constructor(props: IProps) {
    super(props);
    this.chosenHandler = this.chosenHandler.bind(this);
    this.state = { currentCategory: 'all' };
  }

  async componentDidMount() {
    const urlString = location.pathname.split(':');
    if (urlString[0] === '/category/') this.categorySwitch(urlString[1]);
    this.categories = [...(await this.myQuery())];
    this.currentCategory = urlString[1];
    await this.setState({
      currentCategory: this.currentCategory,
    });
    this.props.setPage(this.currentCategory);
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
