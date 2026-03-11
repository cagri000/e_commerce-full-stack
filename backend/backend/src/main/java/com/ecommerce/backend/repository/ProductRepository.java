package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // SİHİRLİ METOT: Spring bu isme bakıp SQL'i kendi yazar:
    // "SELECT * FROM Products WHERE category_id = ?"
    List<Product> findByCategoryId(Integer categoryId);
}