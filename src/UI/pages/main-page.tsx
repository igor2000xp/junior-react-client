import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GetProductsByCategoryDocument } from '../../graphql/generated';

class MainPage extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1>All cat page</h1>
          <nav
            style={{
              borderBottom: 'solid 1px',
              paddingBottom: '1rem',
            }}
          >
            <Link to="/invoices">Invoices</Link> |{' '}
            <Link to="/expenses">Expenses</Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default MainPage;
