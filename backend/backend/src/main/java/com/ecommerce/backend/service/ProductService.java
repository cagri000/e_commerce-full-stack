package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Tüm ürünleri getir
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Kategori ID'sine göre ürünleri getir
    public List<Product> getProductsByCategoryId(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    // Ürün kaydetme (Test için lazım olabilir)
    public Product save(Product product) {
        return productRepository.save(product);
    }


    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }
}