package com.inventory.application.services;

import com.inventory.application.model.Customer;
import com.inventory.application.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    public ResponseEntity<Object> newCustomer(Customer c){
        if(customerRepository.existsByFullName(c.getFullName())){
            return new ResponseEntity<>("Customer Already Exists", HttpStatus.ALREADY_REPORTED);
        }
        else{
            customerRepository.save(c);
            return new ResponseEntity<>("Customer has been added successfully",HttpStatus.OK);
        }
    }
}
