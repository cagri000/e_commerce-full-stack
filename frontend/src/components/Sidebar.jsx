import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Kategoriler</h3>
      <ul className="sidebar-list">
        <li>
            <Link to="/category/1" className="sidebar-link">💻 Elektronik</Link>
        </li>
        <li>
            <Link to="/category/2" className="sidebar-link">👗 Moda</Link>
        </li>
        <li>
            <Link to="/category/3" className="sidebar-link">🏠 Ev & Yaşam</Link>
        </li>
        <li>
            <Link to="/category/4" className="sidebar-link">⚽ Spor</Link>
        </li>
        {/* İleride buraya daha çok kategori eklenecek */}
      </ul>
    </aside>
  );
}

export default Sidebar;