import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Cities from './pages/Cities';
import Products from './pages/Products'; // Agregamos la importación para Products
import Clients from './pages/Clients'; // Agregamos la importación para Clients

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cities />} />
        <Route path="/cities" element={<Cities />} /> {/* Ruta para mostrar Cities */}
        <Route path="/products" element={<Products />} /> {/* Ruta para mostrar Products */}
        <Route path="/clients" element={<Clients />} /> {/* Ruta para mostrar Clients */}
        {/* Aquí puedes agregar más rutas */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
