import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Giriş yapmamışsa atmak için
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // 1. Sayfa Yüklendiğinde Sepeti Çek
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login'); // Kullanıcı yoksa login'e postala
      return;
    }

    const user = JSON.parse(storedUser);
    fetchCart(user.id);
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Sepet yüklenirken hata:", error);
    }
  };

  // 2. Ürün Silme Fonksiyonu
  const handleRemoveItem = async (itemId) => {
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);

    try {
      // DELETE isteği: /api/cart/{userId}/remove/{itemId}
      const response = await axios.delete(`http://localhost:8080/api/cart/${user.id}/remove/${itemId}`);
      setCart(response.data); // Güncel sepeti ekrana bas (Backend güncel halini dönüyor)
      alert("Ürün sepetten silindi.");
      window.location.reload(); // Navbar güncellensin diye (Geçici)
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  if (!cart) return <div style={{padding:'20px'}}>Sepet yükleniyor...</div>;

  return (
    <div className="cart-container">
      <h2>🛒 Alışveriş Sepetim</h2>

      {cart.items.length === 0 ? (
        <p className="empty-cart">Sepetinizde henüz ürün yok.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Fiyat</th>
                <th>Adet</th>
                <th>Toplam</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product-info">
                      <img 
                        src={item.product.imageUrl || "https://placehold.co/50x50"} 
                        alt="urn" 
                        width="50"
                      />
                      <span>{item.product.name}</span>
                    </div>
                  </td>
                  <td>{item.price} TL</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)} TL</td>
                  <td>
                    <button 
                      className="btn-remove" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      🗑️ Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Genel Toplam: <span className="total-price">{cart.totalPrice} TL</span></h3>
            <button className="btn-checkout">💳 Ödemeye Geç</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;