package com.vacuum.backend.entities;

import java.util.List;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;
    @Column(name = "scode", nullable = false,unique = true)
    private String scode;
    @Column(name = "name", nullable = false, length = 20)
    private String name;
    @Column(name = "place", nullable = false, length = 20)
    private String place;
    @Column(name = "city", nullable = false, length = 20)
    private String city;
    @Column(name = "availability", nullable = false)
    private boolean avail;
    @Column(name = "price", nullable = false)
    private int price;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name = "sid", referencedColumnName = "sid")
    List<Reviews> review;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name = "sid", referencedColumnName = "sid")
    List<BookedDates> bookings;


    
}
