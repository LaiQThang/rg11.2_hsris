import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
