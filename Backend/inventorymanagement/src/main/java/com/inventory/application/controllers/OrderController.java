package com.inventory.application.controllers;

import com.inventory.application.model.Order;
import com.inventory.application.repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrdersRepo orderRepository;

    @Autowired
    public OrderController(OrdersRepo orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + id));
    }

    @PatchMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody String newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + id));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}
