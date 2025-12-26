package com.example.ECommerce.Service;

import com.example.ECommerce.Entities.Product;
import com.example.ECommerce.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public Product get(Long productId) {
        Optional<Product> byProId = productRepo.findById(productId);
        return byProId.orElseThrow(()->new RuntimeException("product not found"));
    }

    public Product add(Product product) {
        return productRepo.save(product);
    }

    public Product delete(Long id) {
        Optional<Product> byProId = productRepo.findById(id);
        if(byProId.isEmpty()) throw new RuntimeException("product not found");
        productRepo.deleteById(id);
        return byProId.get();
    }
}
