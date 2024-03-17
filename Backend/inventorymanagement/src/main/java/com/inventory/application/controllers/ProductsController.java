package com.inventory.application.controllers;

import com.inventory.application.model.Product;
import com.inventory.application.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("products")
public class ProductsController {
    @Autowired
    ProductRepository productRepository;
    @GetMapping("/")
    List<Product> getAllProducts(){
        return productRepository.findAll();
    }
}
