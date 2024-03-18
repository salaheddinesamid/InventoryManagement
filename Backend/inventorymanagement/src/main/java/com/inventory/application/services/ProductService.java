package com.inventory.application.services;

import com.inventory.application.exceptions.ProductNotFoundException;
import com.inventory.application.model.Product;
import com.inventory.application.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    // Create a service for filtering products that have null information
    public List<Product> filterProducts(){
        List<Product> products = productRepository.findAll();
        List<Product> filteredProducts = new ArrayList<>();
        for(Product p :products){
            // Condition
            if(p.getProductType() != null){
                filteredProducts.add(p);
            }
        }
        return filteredProducts;
    }
    // Create a service to add new product that only exists once
    public ResponseEntity<Object> addNewProduct(Product product){
        if(productRepository.existsByProductName(product.getProductName())){
            return new ResponseEntity<>("Product already exists", HttpStatus.ALREADY_REPORTED);
        }else{
            productRepository.save(product);
            return new ResponseEntity<>("Product added successfully",HttpStatus.OK);
        }
    }
    // Create a service that counts the number of total product
    public int totalProducts(){
        int count = 0;
        for(Product p : productRepository.findAll()){
            count +=1;
        }
        return count;

    }
    // Create a service that updates information about a specific product
    public Product update(Long id, int price, int quantity, String status){
        // Looking for the target product
        return productRepository.findById(id).map(
                product -> {
                    // Set the new price
                    product.setPrice(price);
                    // Set the new quantity
                    product.setQuantity(quantity);
                    // Set the new status
                    product.setStatus(status);
                    // Update and Save information
                    return productRepository.save(product);
                }
        ).orElseThrow(ProductNotFoundException::new);
    }
}
