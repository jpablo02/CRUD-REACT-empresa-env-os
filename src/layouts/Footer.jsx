import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>SPA - TCC diseñada por Juan Pablo Rios Betancur © {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="https://github.com/tu_usuario_github" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="footer-divider">|</span>
          <a href="https://www.youtube.com/tu_canal" target="_blank" rel="noopener noreferrer">YouTube</a>
          <span className="footer-divider">|</span>
          <a href="https://www.instagram.com/tu_perfil_instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
