import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import './App.css'
import Search from "./pages/Search";
import Home from "./pages/Home";

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
              exact
              path='/'
              element={<Home/>}
          />
         <Route
             exact
              path='/search'
              element={<Search/>}
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
