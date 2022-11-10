package com.vacuum.backend.structure;

import javax.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String pass;
    public boolean admin;
    private String masterpass;
    
}
