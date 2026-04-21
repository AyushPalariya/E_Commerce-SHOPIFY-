package com.example.ECommerce.Service;

import com.example.ECommerce.DTO.OrderDTO;
import com.example.ECommerce.DTO.OrderItemDTO;
import com.example.ECommerce.DTO.OrderRequest;
import com.example.ECommerce.Entities.PaymentOrder;
import com.example.ECommerce.Repository.OrderRepo;
import com.example.ECommerce.Repository.PaymentRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {
    @Value("${razorpay.key_id}")
    private String key;
    @Value("${razorpay.key_secret}")
    private String secretKey;
    @Autowired
    private PaymentRepo paymentRepo;
    @Autowired
    private EmailService emailService;


    public String createOrder(PaymentOrder orderDetails) throws RazorpayException {
        RazorpayClient client=new RazorpayClient(key,secretKey);//razor communication
        System.out.println("11");
        //(razorpay ka request sample hai) create
        JSONObject orderRequest=new JSONObject();
        System.out.println("Amount from frontend: " + orderDetails.getAmount());
        System.out.println("Key: " + key + " | SecretKey length: " + (secretKey != null ? secretKey.length() : "NULL"));
        orderRequest.put("amount",(int)(orderDetails.getAmount()*100));//paise
        orderRequest.put("currency","INR");
        orderRequest.put("receipt","txn_"+ UUID.randomUUID());
        System.out.println("22");
        //give to razorpay and get from raorpay
        Order razorpayOrder=client.Orders.create(orderRequest);
        System.out.println(razorpayOrder.toString());
        //now set
        System.out.println("33");
        orderDetails.setOrderId(razorpayOrder.get("id"));
        orderDetails.setCreatedAt(LocalDateTime.now());
        orderDetails.setStatus("Created");

        paymentRepo.save(orderDetails);
        return razorpayOrder.toString();
    }

    public void updateOrder(String paymentId, String orderId, String status, OrderDTO orderData) {
        PaymentOrder orderDetails=paymentRepo.findByOrderId(orderId);
        if("Confirmed".equalsIgnoreCase(status)){
            orderDetails.setStatus(status);
            orderDetails.setPaymentId(paymentId);
            paymentRepo.save(orderDetails);
            emailService.email(orderDetails.getEmail(),orderDetails.getPaymentId(), orderDetails.getName(),
                                        orderDetails.getOrderId(),orderDetails.getAmount(),orderData.getOrderItemDTO());
        }
        else System.out.println("Response is not success in updateOrder...");
    }
}
