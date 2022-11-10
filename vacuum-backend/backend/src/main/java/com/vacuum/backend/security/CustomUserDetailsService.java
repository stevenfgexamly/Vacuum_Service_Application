package com.vacuum.backend.security;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.vacuum.backend.repo.UserRepo;
import com.vacuum.backend.entities.User;

@Service
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    UserRepo userrepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        User user = userrepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email Not Found "+email));

                return CustomUserDetails.build(user);
    }
    
}
