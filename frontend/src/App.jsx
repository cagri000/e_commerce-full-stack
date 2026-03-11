import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ProductDetail from './components/ProductDetail';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Navbar />

      {/* ORTA ALAN: Yan yana dizilim için "flex" kullanıyoruz */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* SOL: Sidebar */}
        <Sidebar />

        {/* SAĞ: İçerik Alanı */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default App;