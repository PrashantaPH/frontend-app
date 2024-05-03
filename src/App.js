import './App.css';
import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Employee from './page/Employee';
import Addproduct from './page/Addproduct';
import Settings from './page/Settings';
import Footer from './page/Footer';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Dashboard/> }></Route>
        <Route path='/employee' element = { <Employee/> }></Route>
        <Route path='/addproduct' element = { <Addproduct/> }></Route>
        <Route path='/settings' element = { <Settings/> }></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
