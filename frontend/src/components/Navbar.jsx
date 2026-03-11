import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Sayfa açılınca hafızayı kontrol et
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Kullanıcı bilgisini state'e at
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Hafızadan sil
    setUser(null);
    navigate('/login'); // Giriş sayfasına at
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2>TechShop 🚀</h2>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><a href="#">Hakkımızda</a></li>
        <li><a href="#">İletişim</a></li>
      </ul>

      <div className="navbar-actions">
        {/* Kullanıcı varsa HOŞ GELDİN, yoksa GİRİŞ YAP göster */}
        {user ? (
          <>
            <Link to="/cart">
              {/* Şimdilik (0) yazsın, birazdan dinamik yapacağız */}
              <button className="cart-btn">🛒 Sepetim Görüntüle</button>
            </Link>
            <span style={{ fontSize: '0.9rem' }}>👤 {user.phoneNumber}</span>
            <button onClick={handleLogout} className="login-btn" style={{ borderColor: 'red', color: 'red' }}>Çıkış</button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-btn">Giriş Yap</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;