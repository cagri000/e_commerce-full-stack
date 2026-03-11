import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false); // Giriş mi Kayıt mı? (Başlangıç: Giriş)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const navigate = useNavigate(); // Sayfa değiştirmek için

  // İnputlara yazı yazınca çalışır
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Butona basınca çalışır
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Backend adresini belirle (Kayıt mı Giriş mi?)
    const endpoint = isRegister 
        ? 'http://localhost:8080/api/users/register' 
        : 'http://localhost:8080/api/users/login';

    try {
      const response = await axios.post(endpoint, formData);
      
      // Başarılıysa:
      alert(isRegister ? "Kayıt Başarılı! Şimdi giriş yapabilirsin." : "Giriş Başarılı! Hoş geldin.");
      
      if (!isRegister) {
        // Giriş yaptıysa kullanıcıyı tarayıcı hafızasına kaydet
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/'); // Ana sayfaya git
        window.location.reload(); // Navbar güncellensin diye sayfayı yenile
      } else {
        // Kayıt olduysa giriş ekranına dön
        setIsRegister(false);
      }

    } catch (error) {
      // Hata varsa (Örn: Yanlış şifre)
      alert("İşlem Başarısız: " + (error.response?.data || "Sunucu hatası"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? 'Kayıt Ol 📝' : 'Giriş Yap 🔐'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Telefon Numarası</label>
            <input 
              type="text" 
              name="phoneNumber" 
              placeholder="5551234567" 
              value={formData.phoneNumber}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Şifre</label>
            <input 
              type="password" 
              name="password" 
              placeholder="******" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>

        {/* Mod Değiştirme Linki */}
        <p className="toggle-text" onClick={() => setIsRegister(!isRegister)}>
          {isRegister 
            ? 'Zaten hesabın var mı? Giriş Yap' 
            : 'Hesabın yok mu? Kayıt Ol'}
        </p>
      </div>
    </div>
  );
}

export default LoginPage;