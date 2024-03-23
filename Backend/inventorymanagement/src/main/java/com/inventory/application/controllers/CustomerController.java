package com.inventory.application.controllers;

import com.inventory.application.model.Customer;
import com.inventory.application.services.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;
    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }
    @PostMapping("/register")
    ResponseEntity<Object> register(@RequestBody Customer customer){
        return customerService.newCustomer(customer);
    }
}
