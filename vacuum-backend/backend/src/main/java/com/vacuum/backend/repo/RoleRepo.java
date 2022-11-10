package com.vacuum.backend.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.ERole;
import com.vacuum.backend.entities.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role,Integer>{

    Optional<Role> findByRolename(ERole rolename);
    
}
