package com.inventory.application.services;

import com.inventory.application.dto.LoginDto;
import com.inventory.application.dto.RegisterDto;
import com.inventory.application.filters.JwtUtilities;
import com.inventory.application.model.Manager;
import com.inventory.application.model.RoleName;
import com.inventory.application.model.Roles;
import com.inventory.application.repository.ManagerRepository;
import com.inventory.application.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ManagerService {
    private final AuthenticationManager authenticationManager;
    private final ManagerRepository managerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilities jwtUtilities;

    public Roles saveRole(Roles role) {
        return roleRepository.save(role);
    }

    public Manager saveUser(Manager manager) {
        return managerRepository.save(manager);
    }

    public ResponseEntity<?> register(RegisterDto registerDto) {
        if (managerRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("email is already taken!", HttpStatus.SEE_OTHER);
        } else {
            Manager manager = new Manager();
            manager.setEmail(registerDto.getEmail());
            manager.setFirstName(registerDto.getFirstName());
            manager.setLastName(registerDto.getLastName());
            manager.setPassword(passwordEncoder.encode(registerDto.getPassword()));

            String myrole = "USER";
            if (registerDto.getUserRole().equalsIgnoreCase("admin")) {
                myrole = "ADMIN";
            }

            Roles role = roleRepository.findByRoleName(RoleName.valueOf(myrole));
            if (role == null) {
                return new ResponseEntity<>("Role not found!", HttpStatus.BAD_REQUEST);
            }

            manager.setUserRole(myrole);
            manager.setRoles(Collections.singletonList(role));
            managerRepository.save(manager);

            String token = jwtUtilities.generateToken(registerDto.getEmail(), Collections.singletonList(role.getRoleName()));
            return new ResponseEntity<>(new BearerToken(token, "Bearer"), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Manager user = managerRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r -> rolesNames.add(r.getRoleName()));
        String token = jwtUtilities.generateToken(user.getUsername(), rolesNames);
        System.out.println(token);
        return new ResponseEntity<>(new BearerToken(token, "Bearer"), HttpStatus.OK);
    }

    public Manager getDetails(String email) {
        return managerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
