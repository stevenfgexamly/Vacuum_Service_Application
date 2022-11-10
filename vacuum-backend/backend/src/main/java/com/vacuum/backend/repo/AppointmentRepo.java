package com.vacuum.backend.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.Appointment;
import com.vacuum.backend.entities.User;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment,Integer>{

    // public User findByEmail(String email);
    // Optional<User> findByUid(int uid);
    // Optional<User> findByEmail(String email);
    // Boolean existsByEmail(String email);
    public long deleteByAid(int aid);
    Optional<Appointment> findByAid(int aid);
    @Query(value="SELECT * from appointment WHERE uid = ?1", 
    nativeQuery = true)
    public List<Appointment> findByUid(int uid);
    @Query(value="SELECT * from appointment WHERE completion = false", 
    nativeQuery = true)
    public List<Appointment> findPending();

    
}
