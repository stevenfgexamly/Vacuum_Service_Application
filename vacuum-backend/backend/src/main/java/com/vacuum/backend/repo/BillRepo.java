package com.vacuum.backend.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.Bill;
import com.vacuum.backend.entities.User;

@Repository
public interface BillRepo extends JpaRepository<Bill,Integer>{

    // public User findByEmail(String email);
    // Optional<User> findByUid(int uid);
    // Optional<User> findByEmail(String email);
    // Boolean existsByEmail(String email);
    
}