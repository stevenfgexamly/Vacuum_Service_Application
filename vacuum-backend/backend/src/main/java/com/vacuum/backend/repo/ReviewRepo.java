package com.vacuum.backend.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vacuum.backend.entities.Reviews;

@Repository
public interface ReviewRepo extends JpaRepository<Reviews,Integer>{

    @Query(value="SELECT * from Reviews WHERE sid = ?1", 
    nativeQuery = true)
    public List<Reviews> findServiceComments(int sid);
    public long deleteByReviewid(int rid);

}
