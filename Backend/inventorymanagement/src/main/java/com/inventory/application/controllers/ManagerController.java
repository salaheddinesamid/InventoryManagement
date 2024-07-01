package com.inventory.application.controllers;


import com.inventory.application.dto.LoginDto;
import com.inventory.application.dto.RegisterDto;
import com.inventory.application.filters.JwtUtilities;
import com.inventory.application.repository.ManagerRepository;
import com.inventory.application.services.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/manager")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class ManagerController {
    private final ManagerService managerService;
    private final JwtUtilities jwtUtilities;
    private final ManagerRepository managerRepository;
    @GetMapping("/test")
    public String test(){
        return "Hello";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginDto loginDto) {
        return managerService.authenticate(loginDto);
    }

    @PostMapping("register")

    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        return managerService.register(registerDto);
    }

}