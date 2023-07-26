import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Cities from './pages/Cities';
import Products from './pages/Products';
import Clients from './pages/Clients';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
