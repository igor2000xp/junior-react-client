import React, { Component } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './UI/pages/common/header';
import PdpCard from './UI/pages/product-cards/pdp-card/pdp-card';
import PlpPage from './UI/pages/product-cards/plp-pages/plp-page';
import MiniCart from './UI/pages/product-cards/minicart-pages/mini-cart';
import NoMatch from './UI/pages/no-match/no-match';
import MainPage from './UI/pages/main-page';

class App extends Component {
  // private category: string;
  //
  // constructor(props: any) {
  //   super(props);
  //   this.category = 'all';
  // }
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/category/:categoryId" element={<MainPage />} />
          <Route path="/" element={<Navigate replace to="/category/:all" />} />
          <Route path="/junior-react-client" element={<Navigate replace to="/category/:all" />} />
          {/*<Route path="tech" element={<TechPage />} />*/}
          {/*<Route path="clothes" element={<ClothesPage />} />*/}
          <Route path="pdp" element={<PdpCard />} />
          <Route path="cart" element={<PlpPage />} />
          <Route path="mini-cart" element={<MiniCart />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        {/*<h2>Footer</h2>*/}
      </div>
    );
  }
}

export default App;
