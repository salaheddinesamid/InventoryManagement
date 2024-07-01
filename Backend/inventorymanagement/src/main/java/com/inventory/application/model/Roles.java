package com.inventory.application.model;


import jakarta.persistence.*;
import lombok.*;

@Setter
@Entity
@NoArgsConstructor
public class Roles {
    @Getter
    @Id
    @GeneratedValue
    private Integer id;
    @Enumerated(EnumType.STRING)
    RoleName roleName;

    public Roles(RoleName roleName){
        this.roleName = roleName;
    }
    public String getRoleName(){
        return roleName.toString();
    }

}
