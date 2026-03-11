import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Sol Taraf: Marka ve Slogan */}
        <div className="footer-brand">
          <h3>TechShop 🚀</h3>
          <p>En yeni teknolojiler, en uygun fiyatlarla.</p>
        </div>

        {/* Orta Taraf: Linkler */}
        <div className="footer-links">
          <h4>Hızlı Linkler</h4>
          <ul>
            <li><a href="#">Hakkımızda</a></li>
            <li><a href="#">İletişim</a></li>
            <li><a href="#">Gizlilik Politikası</a></li>
          </ul>
        </div>

        {/* Sağ Taraf: Sosyal Medya (Temsili) */}
        <div className="footer-social">
            <h4>Bizi Takip Edin</h4>
            <div className="social-icons">
                <span>📷 Instagram</span>
                <span>🐦 Twitter</span>
            </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TechShop. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}

export default Footer;