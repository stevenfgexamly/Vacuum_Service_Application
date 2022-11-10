package com.vacuum.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.Service;

@Repository
public interface ServiceRepo extends JpaRepository<Service,Integer>{

    public Service findBySid(int sid);
    public long deleteBySid(int sid);

}
