import React from 'react';
import './App.css';
// import { Link } from 'react-router-dom';
import MainPage from './UI/pages/main-page';
// import { useQuery } from '@apollo/client';
// import { GetProductsByCategoryDocument } from './graphql/generated';
import { Route, Routes } from 'react-router-dom';
import TechPage from './UI/pages/tech-page';

function App() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const { data, error, loading } = useQuery(GetProductsByCategoryDocument);
  // console.log(data);

  return (
    <div className="App">
      <h1>Header</h1>
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
        <Route path="/" element={<MainPage />} />
        <Route path="tech" element={<TechPage />} />
      </Routes>

      <h2>Footer</h2>
    </div>
  );
}

export default App;
