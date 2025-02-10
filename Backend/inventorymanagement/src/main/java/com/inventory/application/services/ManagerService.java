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
import org.springframework.web.server.ResponseStatusException;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

            String token = jwtUtilities.generateToken(registerDto.getEmail(), String.valueOf(Collections.singletonList(role.getRoleName())));
            return new ResponseEntity<>(new BearerToken(token, "Bearer"), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> authenticate(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Manager user = managerRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        List<String> roleNames = user.getRoles().stream()
                .map(Roles::getRoleName)
                .toList();

        String token = jwtUtilities.generateToken(user.getUsername(), String.valueOf(roleNames));

        System.out.println("Generated JWT Token for user: {}" + user.getUsername());

        return ResponseEntity.ok(new BearerToken(token, "Bearer"));
    }


    public Manager getDetails(String email) {
        return managerRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
