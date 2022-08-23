import React, { Component } from 'react';
import stylesNoMatch from './no-match.module.css';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <section className={stylesNoMatch.wrapper}>
        <h1>Resource don't find</h1>
        <button className={stylesNoMatch.btnGo}>
          <Link to={'/'}>Go to the home page</Link>
        </button>
      </section>
    );
  }
}

export default NoMatch;
