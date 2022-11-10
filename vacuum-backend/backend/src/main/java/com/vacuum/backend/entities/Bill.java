package com.vacuum.backend.entities;

import java.util.Date;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "bill")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billid;
    private int price;
    private double aftertax;
    private int tiervalue;
    private double finalprice;
    @Temporal(TemporalType.DATE)
    private Date date;

    // @OneToOne(mappedBy = "bill")
    // private Appointment appointment;

    // @OneToOne(mappedBy = "bill")
    // @JoinColumn(name = "aid")
    // private Appointment appointment;

}
