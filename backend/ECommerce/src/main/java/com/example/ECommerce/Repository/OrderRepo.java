package com.example.ECommerce.Repository;

import com.example.ECommerce.DTO.OrderDTO;
import com.example.ECommerce.Entities.Orders;
import com.example.ECommerce.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepo extends JpaRepository<Orders,Long> {
    @Query(value ="Select o.* from Orders as o inner join User as u on o.user_id=u.id",nativeQuery = true)//Some change
    List<Orders> findAllOrdersWithUsers();
    List<Orders> findByUserId(Long userid);//change
}
