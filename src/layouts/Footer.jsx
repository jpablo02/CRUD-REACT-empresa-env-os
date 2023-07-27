// src/layouts/Footer.js

import React from 'react';
import './Footer.css'; // Agrega el archivo de estilos CSS correspondiente

const Footer = () => {
  return (
    <footer className="footer">
      <p>SPA - TCC diseñada por Juan Pablo Rios Betancur &copy; {new Date().getFullYear()}</p>
      <ul>
        <li>
          <a href="https://github.com/tu_usuario_github" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/tu_canal_youtube" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/tu_perfil_instagram" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
