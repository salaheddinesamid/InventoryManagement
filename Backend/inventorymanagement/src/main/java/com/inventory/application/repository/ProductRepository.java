package com.inventory.application.repository;

import com.inventory.application.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<Product,Long> {
    boolean existsByProductName(String name);

    Product findById(long id);
    Product findByProductName(String name);
}
