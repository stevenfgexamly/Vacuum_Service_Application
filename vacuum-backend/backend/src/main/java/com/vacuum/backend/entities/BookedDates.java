package com.vacuum.backend.entities;

import java.util.Date;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BookedDates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bid;
    @Temporal(TemporalType.DATE)
    private Date date;
}