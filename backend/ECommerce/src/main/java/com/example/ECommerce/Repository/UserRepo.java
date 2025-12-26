package com.example.ECommerce.Repository;

import com.example.ECommerce.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
   Optional<User> findByEmail(String email);
}
