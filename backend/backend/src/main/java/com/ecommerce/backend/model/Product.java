package com.ecommerce.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // Bunu import etmeyi unutma

import java.math.BigDecimal; // Para birimi için

@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private BigDecimal price; // Fiyat için BigDecimal kullanılır

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl; // Java'da camelCase (imageUrl), SQL'de snake_case (image_url)

    // --- İLİŞKİ AYARI (En Önemli Kısım) ---

    @ManyToOne(fetch = FetchType.LAZY) // Bir ürünün BİR kategorisi olur
    @JoinColumn(name = "category_id", nullable = false) // SQL'deki 'category_id' sütunuyla bağlan
    @JsonIgnore // (ÖNEMLİ) Ürünü çekerken sonsuz döngüye girmesin diye kategoriyi şimdilik gizle
    private Category category;

    // --- GETTER ve SETTER METODLARI ---

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}