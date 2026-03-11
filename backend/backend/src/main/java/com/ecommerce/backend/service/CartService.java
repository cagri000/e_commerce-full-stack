package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.CartItemRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    // 1. KULLANICININ SEPETİNİ GETİR (Yoksa oluşturur)
    public Cart getCartByUserId(Long userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

        if (optionalCart.isPresent()) {
            return optionalCart.get();
        } else {
            // Sepet yoksa yeni oluştur
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı!"));

            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        }
    }

    // 2. SEPETE ÜRÜN EKLE
    public Cart addToCart(Long userId, Long productId, int quantity) {
        Cart cart = getCartByUserId(userId);

        // --- DÜZELTME BURADA ---
        // Senin Product ID'n Integer olduğu için, gelen Long'u .intValue() ile çeviriyoruz.
        Product product = productRepository.findById(productId.intValue())
                .orElseThrow(() -> new RuntimeException("Ürün bulunamadı!"));

        CartItem existingItem = null;

        // Sepette bu ürün zaten var mı kontrol et
        for (CartItem item : cart.getItems()) {
            // Burada da karşılaştırma yaparken ID'leri eşitlememiz lazım
            if (item.getProduct().getId().equals(product.getId())) {
                existingItem = item;
                break;
            }
        }

        if (existingItem != null) {
            // Varsa adedini artır
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            // Yoksa yeni kalem oluştur
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPrice(product.getPrice());
            cart.getItems().add(newItem);
        }

        // Toplam tutarı güncelle
        updateCartTotal(cart);

        return cartRepository.save(cart);
    }

    // 3. SEPETTEN ÜRÜN SİL
    public Cart removeFromCart(Long userId, Long cartItemId) {
        Cart cart = getCartByUserId(userId);

        // Listeden silinecek ürünü bul ve kaldır
        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));

        // Toplam tutarı güncelle
        updateCartTotal(cart);

        return cartRepository.save(cart);
    }

    // YARDIMCI METOD: TOPLAM TUTARI HESAPLA
    private void updateCartTotal(Cart cart) {
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cart.getItems()) {
            BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);
        }

        cart.setTotalPrice(total);
    }
}