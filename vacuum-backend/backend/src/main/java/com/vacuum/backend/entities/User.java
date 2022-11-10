package com.vacuum.backend.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    @Column(name = "email", nullable = false, length = 20,unique = true)
    private String email;
    @Column(name = "name", nullable = false, length = 20)
    private String name;
    @Column(name = "pass", nullable = false, length = 120)
    private String pass;
    
    @ManyToMany( fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name="uid"),
            inverseJoinColumns = @JoinColumn(name="rid"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name = "uid", referencedColumnName = "uid")
    List<Appointment> appointments;
    
    
    public User(){}

    public User(String email,String pass,String name)
    {
        this.email = email;
        this.pass = pass;
        this.name = name;
    }
}