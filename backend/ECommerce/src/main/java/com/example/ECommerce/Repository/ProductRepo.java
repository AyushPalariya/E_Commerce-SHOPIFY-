package com.example.ECommerce.Repository;

import com.example.ECommerce.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product,Long> {
}
