package com.inventory.application.repository;

import com.inventory.application.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepo extends JpaRepository<Order,Long> {
}
