import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Components/NavigationBar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { AboutSpectacle } from './Pages/AboutSpectacle'

function App() {
  return (
    <>
      <Router>
        <Navigationbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/about/:searchString" element={<About/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/aboutSpectacle/:name" element={<AboutSpectacle />}/>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
