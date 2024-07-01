package com.inventory.application.services;

import com.inventory.application.model.Manager;
import com.inventory.application.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomerDetailsService implements UserDetailsService {
    private final ManagerRepository managerRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Manager manager = managerRepository.findByEmail(email).orElseThrow();
        return manager;
    }
}