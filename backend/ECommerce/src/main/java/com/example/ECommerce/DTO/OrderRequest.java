package com.example.ECommerce.DTO;

import java.util.Map;

public class OrderRequest {
    private Map<Long,Integer> productQuantities;
    private double totalAmount;

    public OrderRequest(Map<Long, Integer> productQuantities, double totalAmount) {
        this.productQuantities = productQuantities;
        this.totalAmount = totalAmount;
    }

    public Map<Long, Integer> getProductQuantities() {
        return productQuantities;
    }

    public void setProductQuantities(Map<Long, Integer> productQuantities) {
        this.productQuantities = productQuantities;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
