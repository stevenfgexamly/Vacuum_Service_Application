package com.vacuum.backend.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.vacuum.backend.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;

@Getter
public class CustomUserDetails implements UserDetails{

    private static final long serialVersionUID = 1L;

	private int id;

	private String name;

	private String email;

    @JsonIgnore
	private String pass;

    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(int id, String name, String email, String pass,
            Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.authorities = authorities;
    }


    public static CustomUserDetails build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRolename().name()))
				.collect(Collectors.toList());

		return new CustomUserDetails(
				user.getUid(), 
				user.getName(), 
				user.getEmail(),
				user.getPass(), 
				authorities);
	}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return pass;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CustomUserDetails user = (CustomUserDetails) o;
		return Objects.equals(id, user.id);
	}
    
}
