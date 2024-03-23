package com.inventory.application.controllers;

import com.inventory.application.model.Orders;
import com.inventory.application.services.OrderService;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrdersController {
    private final OrderService orderService;
    public OrdersController(OrderService orderService){
        this.orderService = orderService;
    }
    @PostMapping("/place")
    ResponseEntity<Object> newOrder(@RequestBody Orders order){
        return orderService.placeOrder(order);
    }
    @GetMapping("/")
    List<Orders> getOrders(){
        return orderService.getAllOrders();
    }
}
