package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin // Frontend'den (localhost:5173) gelen isteklere izin ver
public class CartController {

    @Autowired
    private CartService cartService;

    // 1. KULLANICININ SEPETİNİ GETİR
    // İstek: GET http://localhost:8080/api/cart/1
    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    // 2. SEPETE ÜRÜN EKLE
    // İstek: POST http://localhost:8080/api/cart/1/add?productId=5&quantity=1
    @PostMapping("/{userId}/add")
    public Cart addToCart(@PathVariable Long userId,
                          @RequestParam Long productId,
                          @RequestParam int quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    // 3. SEPETTEN ÜRÜN SİL
    // İstek: DELETE http://localhost:8080/api/cart/1/remove/12
    // Not: Buradaki ID, ürünün ID'si değil, CartItem (Sepet Satırı) ID'sidir.
    @DeleteMapping("/{userId}/remove/{itemId}")
    public Cart removeFromCart(@PathVariable Long userId,
                               @PathVariable Long itemId) {
        return cartService.removeFromCart(userId, itemId);
    }
}