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
        List<Product> totalProducts = productRepository.findAll();
        return totalProducts.size();

    }
    // Create a service that updates information about a specific product
    public Product update(Long id, int price, int quantity, String status){
        // Looking for the target product
        return productRepository.findById(id).map(
                product -> {
                    // Set the new price
                    product.setPrice(price);
                    product.setQuantity(quantity);
                    product.setStatus(status);
                    return productRepository.save(product);
                }
                // Throw ProductNotFoundException if the product doesn't exist on Database
        ).orElseThrow(ProductNotFoundException::new);
    }
    public List<Product> search(String startsWith){
        List<Product> products = productRepository.findAll();
        List<Product> filteredProducts = new ArrayList<>();
        for(Product p : products){
            if(p.getProductName().startsWith(startsWith)){
                filteredProducts.add(p);
            }
        }
        return filteredProducts;
    }
    public void delete(Long id){
        productRepository.deleteById(id);
    }
}
