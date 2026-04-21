package com.example.ECommerce.Controller;

import com.example.ECommerce.DTO.OrderDTO;
import com.example.ECommerce.DTO.OrderItemDTO;
import com.example.ECommerce.Entities.PaymentOrder;
import com.example.ECommerce.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody PaymentOrder orderDetails){
        System.out.println("running");
        try {
            String order = paymentService.createOrder(orderDetails);
            return ResponseEntity.ok(order);
        }
        catch (Exception e){
            e.printStackTrace(); // prints full stack trace to console
            System.out.println("EXACT ERROR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/update-order")
    public void updateOrder(@RequestParam String paymentId, @RequestParam String orderId, @RequestParam String status, @RequestBody OrderDTO orders){
        paymentService.updateOrder(paymentId,orderId,status,orders);
    }
}
