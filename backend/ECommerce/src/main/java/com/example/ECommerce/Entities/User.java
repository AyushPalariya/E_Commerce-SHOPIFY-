package com.example.ECommerce.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.List;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    private String email;
    private String phone;
    @JsonIgnore//not save in db also not get in postman
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private List<Orders> ordersList;

    public User(Long id, String name,String phone, String password, String email, List<Orders> ordersList) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.phone=phone;
        this.email = email;
        this.ordersList = ordersList;
    }
    public User(){

    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public List<Orders> getOrdersList() {
        return ordersList;
    }
}
