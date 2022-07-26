import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bookkeeper</h1>
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

export default App;
