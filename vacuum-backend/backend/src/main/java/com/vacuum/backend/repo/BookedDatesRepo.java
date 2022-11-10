package com.vacuum.backend.repo;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.vacuum.backend.entities.BookedDates;


@Repository
public interface BookedDatesRepo extends JpaRepository<BookedDates,Integer>{

    @Query(value="SELECT * from booked_dates WHERE sid = ?1", 
    nativeQuery = true)
    public List<BookedDates> findServiceDates(int sid);

    @Query(value="SELECT * from booked_dates WHERE date=?1 and sid = ?2", 
    nativeQuery = true)
    public BookedDates findByDateandSid(Date d,int sid);
}
