import React from 'react';
import { Compass, Heart, History, MessageSquare, Menu } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <div className="nav-logo">
          <Compass className="logo-icon" size={28} />
          <span>VibeTravel</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#explorar" className="active"><Compass size={18} /> Explorar</a></li>
          <li><a href="#favoritos"><Heart size={18} /> Favoritos</a></li>
          <li><a href="#historico"><History size={18} /> Histórico</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn-ai-chat" title="Assistente de IA">
            <MessageSquare size={20} />
            <span className="ai-badge">IA</span>
          </button>
          <button className="btn-menu mobile-only">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
