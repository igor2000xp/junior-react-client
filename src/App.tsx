import React from 'react';
import './App.css';
// import { Link } from 'react-router-dom';
import MainPage from './UI/pages/main-page';
// import { useQuery } from '@apollo/client';
// import { GetProductsByCategoryDocument } from './graphql/generated';
import { Route, Routes, Navigate } from 'react-router-dom';
import TechPage from './UI/pages/tech-page';
import ClothesPage from './UI/pages/clothes-page';
import Header from './UI/pages/common/header';

function App() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const { data, error, loading } = useQuery(GetProductsByCategoryDocument);
  // console.log(data);

  return (
    <div className="App">
      {/*<h1>Header</h1>*/}
      <Header />
      {/*<Switch>*/}
      {/*  <Route path={`/${currentPage}`}*/}
      {/*         render={() => <Characters currentPage={currentPage}*/}
      {/*                                   loading={loading}*/}
      {/*                                   data={data}*/}
      {/*                                   setCurrentPage={setCurrentPage}/>}/>*/}
      {/*  <Route path={'/tech/:id'} render={() => <Tech />}/>*/}
      {/*  <Redirect exact from='/' to={`/${currentPage}`} />*/}
      {/*</Switch>*/}
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/" element={<Navigate replace to="/home" />} />

        {/*<Route path="/" element={<MainPage />} />*/}
        <Route path="tech" element={<TechPage />} />
        <Route path="clothes" element={<ClothesPage />} />
      </Routes>

      <h2>Footer</h2>
    </div>
  );
}

export default App;
