package com.inventory.application.controllers;

import com.inventory.application.PutRequest;
import com.inventory.application.model.Product;
import com.inventory.application.repository.ProductRepository;
import com.inventory.application.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("products")
public class ProductsController {
    private final ProductService productService;

    ProductsController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/")
    List<Product> getAllProducts(){
        return productService.filterProducts();
    }
    @GetMapping("/total")
    int getTotal(){
        return productService.totalProducts();
    }
    @PostMapping("/newproduct")
    ResponseEntity<Object> newProduct(@RequestBody Product product){
        return productService.addNewProduct(product);
    }
    @RequestMapping(value = "/update",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    Product updateProduct(@RequestBody PutRequest putRequest){
        return productService.update(putRequest.getId(),putRequest.getNewPrice(),putRequest.getNewQuantity(),putRequest.getNewStatus());
    }


}
