import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Tek satırda temiz import
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // URL'deki ID'yi al
  const navigate = useNavigate(); // Yönlendirme için (Login'e atmak gerekirse)
  const [product, setProduct] = useState(null);

  // 1. Sayfa açılınca ürünü getir
  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Hata:", error));
  }, [id]);

  // 2. Sepete Ekleme Fonksiyonu
  const handleAddToCart = async () => {
    // Giriş kontrolü
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Sepete eklemek için önce giriş yapmalısınız! 🛑");
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUser);

    // Backend'e istek at
    try {
      await axios.post(`http://localhost:8080/api/cart/${user.id}/add`, null, {
        params: {
          productId: product.id,
          quantity: 1
        }
      });
      
      alert("Ürün başarıyla sepete eklendi! 🛒");
      
      // Navbar'daki sepet sayısını güncellemek için (Geçici çözüm)
      window.location.reload();

    } catch (error) {
      console.error("Sepet hatası:", error);
      alert("Ürün eklenirken bir hata oluştu.");
    }
  };

  // Veri gelene kadar bekle
  if (!product) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Yükleniyor...</div>;
  }

  return (
    <div className="detail-container">
      {/* Sol Taraf: Resim */}
      <div className="detail-image-box">
        <img 
          src={product.imageUrl || "https://placehold.co/500x500"} 
          alt={product.name} 
          className="detail-img"
          onError={(e) => { e.target.src = "https://placehold.co/500x500?text=Resim+Yok" }}
        />
      </div>

      {/* Sağ Taraf: Bilgiler */}
      <div className="detail-info-box">
        <h1 className="detail-title">{product.name}</h1>
        <p className="detail-desc">{product.description}</p>
        
        <div className="detail-meta">
            <span className="detail-price">{product.price} TL</span>
            <span className="detail-stock">Stok Durumu: {product.stock} Adet</span>
        </div>

        {/* Butona onClick olayını bağladık */}
        <button className="btn-add-large" onClick={handleAddToCart}>
            🛒 Sepete Ekle
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;