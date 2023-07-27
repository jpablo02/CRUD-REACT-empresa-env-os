// src/layouts/Header.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // Agrega el archivo de estilos CSS correspondiente

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        {/* Agrega aquí el logo o título de tu aplicación si lo tienes */}
        <Link to="/">Logo o Título</Link>
      </div>
      <nav>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={location.pathname === '/cities' ? 'active' : ''}>
            <Link to="/cities">Ciudades</Link>
          </li>
          <li className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">Productos</Link>
          </li>
          <li className={location.pathname === '/clients' ? 'active' : ''}>
            <Link to="/clients">Clientes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
