// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Cities from './pages/Cities';
import Products from './pages/Products';
import Clients from './pages/Clients';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para mostrar la página de inicio */}
        <Route path="/cities" element={<Cities />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clients" element={<Clients />} />
        {/* Aquí puedes agregar más rutas */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
