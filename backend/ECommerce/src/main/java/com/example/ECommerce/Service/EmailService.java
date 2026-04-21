package com.example.ECommerce.Service;

import com.example.ECommerce.DTO.OrderItemDTO;
import com.example.ECommerce.Entities.OrderItem;
import com.example.ECommerce.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    public void email(String toEmail, String paymentId, String name, String orderId, double amount, List<OrderItemDTO> l){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Order Confirmation - Payment Successful!");

        // Build order items string
        StringBuilder itemsBuilder = new StringBuilder();
        itemsBuilder.append("\n-----------------------------\n");
        itemsBuilder.append(String.format("%-20s %-10s %-5s\n", "Product", "Price", "Qty"));
        itemsBuilder.append("-----------------------------\n");

        for (OrderItemDTO item : l) {
            itemsBuilder.append(String.format("%-20s ₹%-9.2f %-5d\n",
                    item.getProductName(),
                    item.getProductPrice(),
                    item.getQuantity()
            ));
        }
        itemsBuilder.append("-----------------------------\n");
        itemsBuilder.append("Total Amount: ₹" + amount);

        message.setText(
                "Dear " + name + ",\n\n" + "paymentId : "+paymentId+"\n"+"orderId : "+orderId+
                        "🎉 Your order has been placed successfully!\n\n" +
                        "Order Summary:" +
                        itemsBuilder.toString() +
                        "\n\nThank you for shopping with us!\n" +
                        "ECommerce Store"
        );

        javaMailSender.send(message);
    }


    public void registerEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Welcome to Our Platform 🎉");

        String body = "Dear " + user.getName() + ",\n\n"
                + "Welcome! Your account has been successfully created.\n\n"
                + "Account Details:\n"
                + "Name: " + user.getName() + "\n"
                + "Email: " + user.getEmail() + "\n\n"
                + "Phone_Num: "+user.getPhone()+"\n\n"
                + "You can now log in and start using our services.\n\n"
                + "ThankYou...\n";

        message.setText(body);
        javaMailSender.send(message);

    }
}
