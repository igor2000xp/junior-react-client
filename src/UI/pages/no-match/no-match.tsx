import React, { Component } from 'react';
import stylesNoMatch from './no-match.module.css';
import { Link } from 'react-router-dom';
import unicorn_404 from '../../../assets/images/unicorn_404.svg';

class NoMatch extends Component {
  render() {
    return (
      <section className={stylesNoMatch.wrapper}>
        <h1>Resource doesn't find</h1>
        <button className={stylesNoMatch.btnGo}>
          <Link to={'/'}>Go to the home page</Link>
        </button>
        <div className={stylesNoMatch.img404Block}>
          <img src={unicorn_404} alt="error 404" />
        </div>
      </section>
    );
  }
}

export default NoMatch;
