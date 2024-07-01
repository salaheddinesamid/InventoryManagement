package com.inventory.application.services;

import com.inventory.application.model.Order;
import com.inventory.application.repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrdersRepo ordersRepo;
    public ResponseEntity<Object> placeOrder(Order order){
        ordersRepo.save(order);
        return new ResponseEntity<>("Thank you!!", HttpStatus.OK);
    }
    public List<Order> getAllOrders(){
        return ordersRepo.findAll();
    }
}
