package com.example.ECommerce.Service;

import com.example.ECommerce.DTO.OrderDTO;
import com.example.ECommerce.DTO.OrderItemDTO;
import com.example.ECommerce.Entities.OrderItem;
import com.example.ECommerce.Entities.Orders;
import com.example.ECommerce.Entities.Product;
import com.example.ECommerce.Entities.User;
import com.example.ECommerce.Repository.OrderRepo;
import com.example.ECommerce.Repository.ProductRepo;
import com.example.ECommerce.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private OrderRepo orderRepo;
    public OrderDTO placeOrder(Long userid, Map<Long, Integer> productQuantities, double totalAmount) {
        User user = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("user not found"));

        Orders orders=new Orders();
        orders.setUser(user);
        orders.setOrderDate(new Date());
        orders.setStatus("pending");
        orders.setTotalAmount(totalAmount);

        List<OrderItem> orderItems=new ArrayList<>();
        List<OrderItemDTO> orderItemDTOS=new ArrayList<>();

        for (Map.Entry<Long,Integer> entry:productQuantities.entrySet()){
            Product product=productRepo.findById(entry.getKey()).orElseThrow(
                    ()-> new RuntimeException("product not found"));
            OrderItem orderItem=new OrderItem();
            orderItem.setOrders(orders);
            orderItem.setProduct(product);
            orderItem.setQuantity(entry.getValue());
            orderItems.add(orderItem);

            orderItemDTOS.add(new OrderItemDTO(product.getName(), product.getPrice(), entry.getValue()));
        }
        orders.setOrderItems(orderItems);
        Orders saveOrders=orderRepo.save(orders);
        return new OrderDTO(saveOrders.getId(),saveOrders.getUser().getName(),saveOrders.getUser().getEmail()
                              ,saveOrders.getTotalAmount(), saveOrders.getStatus(), saveOrders.getOrderDate(),orderItemDTOS);
    }

    public List<OrderDTO> getAllOrders() {
        List<Orders> allOrdersWithUsers = orderRepo.findAllOrdersWithUsers();
        return allOrdersWithUsers.stream().map(this::convertToOrderDTO).collect(Collectors.toList());
    }

    public OrderDTO convertToOrderDTO(Orders orders){
        List<OrderItemDTO> collect = orders.getOrderItems().stream().map((item) -> new OrderItemDTO(item.getProduct().getName(), item.getProduct().getPrice(), item.getQuantity())).collect(Collectors.toList());
        return new OrderDTO(orders.getId(),
                orders.getUser()!=null?orders.getUser().getName():"Unknown",
                orders.getUser()!=null?orders.getUser().getEmail():"Unknown",
                orders.getTotalAmount(), orders.getStatus(), orders.getOrderDate(),collect);
    }

    public List<OrderDTO> getOrdersByUser(Long userid) {
        Optional<User> userById = userRepo.findById(userid);
        if(userById.isEmpty()){
            throw new RuntimeException("orders not found");
        }
        User user=userById.get();
        List<Orders> orderList = orderRepo.findByUserId(user.getId());//change
        return orderList.stream().map(this::convertToOrderDTO).collect(Collectors.toList());
    }
}
