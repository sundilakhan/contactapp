package com.example.contactapp.service;

import com.example.contactapp.dto.LogInDTO;
import com.example.contactapp.dto.UserDTO;
import com.example.contactapp.entity.UserEntity;
import com.example.contactapp.repo.UserRepository;
import com.example.contactapp.response.LogInResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl {

    private final LogInService loginService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(LogInService loginService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.loginService = loginService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity saveUser(UserEntity userEntity) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        return userRepository.save(userEntity);
    }

    public List<UserEntity> getAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public String addUser(UserDTO userdto) {
        UserEntity user = new UserEntity();
        user.setUsername(userdto.getUsername());
        user.setPassword(passwordEncoder.encode(userdto.getPassword()));
        user.setEmail(userdto.getEmail());

        return loginService.addUser(userdto); // Delegating to LogInService's addUser method
    }

    public LogInResponse logInUser(LogInDTO loginDto) {
        return loginService.logInUser(loginDto); // Delegating to LogInService's logInUser method
    }
}
