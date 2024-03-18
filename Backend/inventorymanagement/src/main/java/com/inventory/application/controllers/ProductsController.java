package com.inventory.application.controllers;

import com.inventory.application.requesthandler.PutRequest;
import com.inventory.application.model.Product;
import com.inventory.application.services.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("products")
public class ProductsController {
    private final ProductService productService;

    ProductsController(ProductService productService){
        this.productService = productService;
    }
    // Handling GET requests and providing data about all products:
    @GetMapping("/")
    List<Product> getAllProducts(){
        return productService.filterProducts();
    }
    // Handling GET request for getting the total number of products
    @GetMapping("/total")
    int getTotal(){
        // Uses a service from Product Service
        return productService.totalProducts();
    }
    // Handling POST requests to add new products into the system
    @PostMapping("/newproduct")
    ResponseEntity<Object> newProduct(@RequestBody Product product){
        return productService.addNewProduct(product);
    }
    // Handling PUT requests if the manager wants to update information about any product
    @RequestMapping(value = "/update",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    Product updateProduct(@RequestBody PutRequest putRequest){

        return productService.update(putRequest.getId(),putRequest.getNewPrice(),putRequest.getNewQuantity(),putRequest.getNewStatus());
    }


}
