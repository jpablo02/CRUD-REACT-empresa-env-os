// src/layouts/Footer.js

import React from 'react';
import './Footer.css'; // Agrega el archivo de estilos CSS correspondiente

const Footer = () => {
  return (
    <footer className="footer">
      <p>Derechos de autor &copy; {new Date().getFullYear()} TCC</p>
      {/* Agrega enlaces a páginas importantes o iconos de redes sociales si es relevante */}
    </footer>
  );
};

export default Footer;
