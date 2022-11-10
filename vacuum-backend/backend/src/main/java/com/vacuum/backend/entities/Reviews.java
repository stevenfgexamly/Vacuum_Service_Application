package com.vacuum.backend.entities;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewid;
    private String review;
    private String date;
    private String uname;
}