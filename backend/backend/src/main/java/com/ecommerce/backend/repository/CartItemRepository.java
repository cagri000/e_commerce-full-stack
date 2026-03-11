package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Standart JpaRepository metodları (save, delete, findById) bize yeter.
}