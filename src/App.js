import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
            
          <Routes>
            <Route path="/" element={<News category="general"/>} > </Route>
            <Route path="/business" element={<News category="business"/>} > </Route>
            <Route path="/entertainment" element={<News category="entertainment"/>} > </Route>
            <Route path="/general" element={<News category="general"/>} > </Route>
            <Route path="/health" element={<News category="health"/>} > </Route>
            <Route path="/science" element={<News category="science"/>} > </Route>
            <Route path="/sports" element={<News category="sports"/>} > </Route>
            <Route path="/technology" element={<News category="technology"/>} > </Route>
            <Route path="*" element={<h2 style={{textAlign: "center"}}> Page not found <br/> <Link to="/"> Back to Home </Link> </h2> } > </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

