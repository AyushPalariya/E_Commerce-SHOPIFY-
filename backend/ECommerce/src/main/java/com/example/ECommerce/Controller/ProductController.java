package com.example.ECommerce.Controller;

import com.example.ECommerce.Entities.Product;
import com.example.ECommerce.Repository.ProductRepo;
import com.example.ECommerce.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping
    public List<Product> getAllProduct(){
        return productService.getAll();
    }
    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable Long productId){
        return productService.get(productId);
    }
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product){
        return productService.add(product);
    }
    @DeleteMapping("/delete/{id}")
    public Product deletePro(@PathVariable Long id){
        return productService.delete(id);
    }
}
