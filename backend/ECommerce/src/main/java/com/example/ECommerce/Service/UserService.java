package com.example.ECommerce.Service;

import com.example.ECommerce.Entities.User;
import com.example.ECommerce.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    public User registerUser(User user){
        User user1 = userRepo.save(user);
        System.out.println("user added into database");
        return user1;
    }

    public User login(String email,String password) {
        User byEmail = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
        if(byEmail.getPassword().equals(password)){
            return byEmail;
        }
        return null;
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }
}
