package com.example.ECommerce.Controller;

import com.example.ECommerce.Entities.User;
import com.example.ECommerce.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }
    @PostMapping("/login")
    public User login(@RequestBody User user){
        return userService.login(user.getEmail(),user.getPassword());
    }
    @GetMapping("/getAll-users")
    public List<User> getAllUsers(){
        return userService.getAll();
    }
}
