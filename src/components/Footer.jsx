import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2026 VibeTravel. Todos os direitos reservados. Design Premium para Vercel.</p>
        <div className="footer-links">
          <a href="#privacidade">Privacidade</a>
          <a href="#termos">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
