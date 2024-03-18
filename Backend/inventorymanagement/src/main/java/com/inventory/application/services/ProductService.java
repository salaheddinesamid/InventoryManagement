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
    public String modify(String name){
        return name + "@@";
    }
    public List<Product> filterProducts(){
        List<Product> products = productRepository.findAll();
        List<Product> filteredProducts = new ArrayList<>();
        for(Product p :products){
            if(p.getProductType() != null){
                filteredProducts.add(p);
            }
        }
        return filteredProducts;
    }
    public ResponseEntity<Object> addNewProduct(Product product){
        if(productRepository.existsByProductName(product.getProductName())){
            return new ResponseEntity<>("Product already exists", HttpStatus.ALREADY_REPORTED);
        }else{
            productRepository.save(product);
            return new ResponseEntity<>("Product added successfully",HttpStatus.OK);
        }
    }
    public int totalProducts(){
        int count = 0;
        for(Product p : productRepository.findAll()){
            count +=1;
        }
        return count;

    }
    public Product update(Long id, int price, int quantity, String status){
        return productRepository.findById(id).map(
                product -> {
                    product.setPrice(price);
                    product.setQuantity(quantity);
                    product.setStatus(status);
                    return productRepository.save(product);
                }
        ).orElseThrow(ProductNotFoundException::new);
    }
}
