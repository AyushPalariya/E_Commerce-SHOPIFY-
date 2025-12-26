package com.example.ECommerce.Controller;

import com.example.ECommerce.DTO.OrderDTO;
import com.example.ECommerce.DTO.OrderRequest;
import com.example.ECommerce.Entities.User;
import com.example.ECommerce.Service.OrderService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{userid}")
    public OrderDTO placeOrder(@PathVariable Long userid, @RequestBody OrderRequest orderRequest){
        return orderService.placeOrder(userid,orderRequest.getProductQuantities(),orderRequest.getTotalAmount());
    }

    @GetMapping("/getAllOrders")
    public List<OrderDTO> getAllOrders(){
        return orderService.getAllOrders();
    }
    @GetMapping("/user-Order/{userid}")
    public List<OrderDTO> getOrdersByUser(@PathVariable Long userid){
        return orderService.getOrdersByUser(userid);
    }
}
