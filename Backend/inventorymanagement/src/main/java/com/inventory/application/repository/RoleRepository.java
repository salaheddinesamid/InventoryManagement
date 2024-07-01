package com.inventory.application.repository;

import com.inventory.application.model.RoleName;
import com.inventory.application.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Roles,Integer> {
    Roles findByRoleName(RoleName roleName);
}