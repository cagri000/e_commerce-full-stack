import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { Link, useParams, useNavigate } from 'react-router-dom'; // useNavigate eklendi

function ProductList() {
    const [products, setProducts] = useState([]);

    // URL'deki :categoryId kısmını yakalar (Örn: "1", "2")
    const { categoryId } = useParams();

    useEffect(() => {
        // Hangi adrese istek atacağız?
        let url = 'http://localhost:8080/api/products';

        // Eğer kategori seçilmişse URL'i değiştir
        if (categoryId) {
            url = `http://localhost:8080/api/products/category/${categoryId}`;
        }

        axios.get(url)
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));

    }, [categoryId]); // DİKKAT: categoryId her değiştiğinde bu kod tekrar çalışsın!

    // ProductList fonksiyonunun içine:

    const navigate = useNavigate();

    const handleAddToCart = async (productId) => {
        // 1. Kullanıcı giriş yapmış mı kontrol et
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            alert("Sepete ürün eklemek için önce giriş yapmalısınız! 🛑");
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUser);

        // 2. Backend'e istek at
        try {
            // POST isteği: /api/cart/{userId}/add?productId=5&quantity=1
            await axios.post(`http://localhost:8080/api/cart/${user.id}/add`, null, {
                params: {
                    productId: productId,
                    quantity: 1
                }
            });

            alert("Ürün başarıyla sepete eklendi! 🛒");

            // (İsteğe bağlı) Navbar'daki sayıyı güncellemek için sayfayı yenile
            // İleride bunu daha profesyonel (Context API) yapacağız.
            window.location.reload();

        } catch (error) {
            console.error("Sepet hatası:", error);
            alert("Ürün eklenirken bir hata oluştu.");
        }
    };


    return (
        <div>
            {/* Başlığı dinamik yapalım */}
            <h2 style={{ textAlign: 'center', margin: '20px' }}>
                {categoryId ? 'Kategori Ürünleri' : 'Tüm Ürünler'}
            </h2>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.imageUrl || "https://placehold.co/300x200?text=Resim+Yok"}
                                alt={product.name}
                                className="product-image"
                                // İŞTE SİHİRLİ KOD BURASI:
                                onError={(e) => {
                                    e.target.onerror = null; // Sonsuz döngüye girmesin diye
                                    e.target.src = "https://placehold.co/300x200?text=Resim+Yuklenemedi"; // Yedek resim
                                }}
                            />
                        </Link>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">{product.price} TL</p>
                        <button
                            className="btn-add"
                            onClick={() => handleAddToCart(product.id)} // <--- BU SATIRI EKLE
                        >
                            Sepete Ekle
                        </button>

                        <Link to={`/product/${product.id}`} className="btn-detail">
                            İncele
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;