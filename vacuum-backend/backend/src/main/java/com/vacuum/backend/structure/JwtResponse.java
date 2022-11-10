package com.vacuum.backend.structure;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {

    private String token;
    private String type="bearer";
    private int id;
    private String email;
    private List<String> roles;
    private String status;
    private String uname;

    public JwtResponse(String token, int id, String email, List<String> roles,String name,String status) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.status = status;
        this.uname = name;
    }

    
}
