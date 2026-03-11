package com.ecommerce.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Bir kullanıcının BİR sepeti olur (OneToOne)
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Bir sepetin ÇOK kalemi olur (OneToMany)
    // orphanRemoval = true: Sepetten ürün silinince veritabanından da silinsin
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    private BigDecimal totalPrice = BigDecimal.ZERO; // Başlangıçta 0.00 TL

    // --- CONSTRUCTOR ---
    public Cart() {
    }

    // --- MANUEL GETTER & SETTER ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}