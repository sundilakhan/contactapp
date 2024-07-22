package com.example.contactapp.service;

import com.example.contactapp.entity.UserEntity;
import com.example.contactapp.repo.UserRepository;
import com.example.contactapp.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> optionalUser = userRepository.findByUsername(username);
        if (!optionalUser.isPresent()) {
            optionalUser = userRepository.findByEmail(username);
            if (!optionalUser.isPresent()) {
                throw new UsernameNotFoundException("User not found with username or email: " + username);
            }
        }
        UserEntity user = optionalUser.get();
        return new CustomUserDetails(user);
    }
}
