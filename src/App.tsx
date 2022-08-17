import React, { Component } from 'react';
import './App.css';
import MainPage from './UI/pages/main-page';
import { Route, Routes, Navigate } from 'react-router-dom';
import TechPage from './UI/pages/tech-page';
import ClothesPage from './UI/pages/clothes-page';
import Header from './UI/pages/common/header';
import PdpCard from './UI/pages/product-cards/pdp-card/pdp-card';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="tech" element={<TechPage />} />
          <Route path="clothes" element={<ClothesPage />} />
          <Route path="pdp" element={<PdpCard />} />
        </Routes>
        {/*<h2>Footer</h2>*/}
      </div>
    );
  }
}

export default App;
