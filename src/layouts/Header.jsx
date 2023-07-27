// src/layouts/Header.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // Agrega el archivo de estilos CSS correspondiente
import logoImage from '../assets/Default_Create_a_minimalistic_and_clean_logo_of_D_and_R_focusi_2_3c65eb10-6994-468a-8ccb-bafbbf7d6dff_0.png'; // Asegúrate de cambiar 'nombre_de_la_imagen.jpg' por el nombre real de tu imagen y la extensión correcta

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        {/* Agrega aquí el logo o título de tu aplicación si lo tienes */}
        <Link to="/">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
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
