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
          <ul>
            <li>
              <Link to="/">All category</Link>
            </li>
            <li>
              <Link to="/tech">Tech category</Link>
            </li>
            <li>
              <Link to="/clothes">Clothes category</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
