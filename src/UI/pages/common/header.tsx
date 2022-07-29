import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <h2>Header</h2>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to="/tech">Tech category</Link> |{' '}
          <Link to="/clothes">Clothes</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
