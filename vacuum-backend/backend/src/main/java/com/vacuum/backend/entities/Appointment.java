package com.vacuum.backend.entities;

import java.util.Date;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "aid")
    private int aid;
    private int sid;
    private boolean completion = false;
    private String model;
    private String details;
    private String tier;
    private String status;
    private String scode;
    private String sname;
    @Temporal(TemporalType.DATE)
    private Date date;

    // @OneToOne(cascade=CascadeType.ALL)
    // @JoinColumn(name = "aid", referencedColumnName = "aid")
    // private Bill bill;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "aid", referencedColumnName = "billid")
    private Bill bill;

}
