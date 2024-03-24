package com.inventory.application.repository;

import com.inventory.application.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository  extends JpaRepository<Product,Long> {
    // Verify if the product exists in database
    boolean existsByProductName(String name);
    // Find product by the ID
    Product findById(long id);
    // Find product by the name of product
    Product findByProductName(String name);
    List<Product> findByStatus(String status);
}
