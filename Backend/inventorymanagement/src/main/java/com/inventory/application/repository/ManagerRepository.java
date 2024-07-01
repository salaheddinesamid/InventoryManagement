package com.inventory.application.repository;

import com.inventory.application.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager,Integer> {
    Optional<Manager> findByEmail(String email);

    boolean existsByEmail(String email);
}
