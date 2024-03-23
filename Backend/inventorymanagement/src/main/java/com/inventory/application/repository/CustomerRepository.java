package com.inventory.application.repository;

import com.inventory.application.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    public boolean existsByFullName(String fullName);
}
