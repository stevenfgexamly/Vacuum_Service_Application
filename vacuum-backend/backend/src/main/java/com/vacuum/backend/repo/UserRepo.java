package com.vacuum.backend.repo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer>{

    // public User findByEmail(String email);
    Optional<User> findByUid(int uid);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    
}

