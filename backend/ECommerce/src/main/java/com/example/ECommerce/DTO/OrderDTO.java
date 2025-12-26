package com.example.ECommerce.DTO;

import java.util.Date;
import java.util.List;

public class OrderDTO {
    private Long id;
    private String username;
    private String email;
    private double totalAmount;
    private String status;
    private Date orderDate;
    private List<OrderItemDTO> orderItemDTO;

    public OrderDTO(Long id, String username, String email, double totalAmount, String status, Date orderDate, List<OrderItemDTO> orderItemDTO) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.totalAmount = totalAmount;
        this.status = status;
        this.orderDate = orderDate;
        this.orderItemDTO = orderItemDTO;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List<OrderItemDTO> getOrderItemDTO() {
        return orderItemDTO;
    }

    public void setOrderItemDTO(List<OrderItemDTO> orderItemDTO) {
        this.orderItemDTO = orderItemDTO;
    }
}
