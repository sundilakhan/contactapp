package com.example.contactapp.service;

import com.example.contactapp.dto.UserDTO;
import com.example.contactapp.entity.UserEntity;
import com.example.contactapp.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO saveUser(UserDTO userDto) {
        try {
            logger.debug("Saving user with details: {}", userDto);
            UserEntity user = new UserEntity();
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            user.setRole(userDto.getRole());
            user.setUsername(userDto.getUsername());
            logger.debug("Mapped User entity: {}", user);
            UserEntity savedUser = userRepository.save(user);
            logger.debug("Saved User entity: {}", savedUser);

            // Convert UserEntity back to UserDTO
            UserDTO savedUserDto = new UserDTO();
            savedUserDto.setEmail(savedUser.getEmail());
            savedUserDto.setUsername(savedUser.getUsername());
            savedUserDto.setRole(savedUser.getRole());

            return savedUserDto;
        } catch (Exception e) {
            logger.error("Error saving user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to save user");
        }
    }

    public List<UserEntity> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            logger.error("Error fetching all users: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch users");
        }
    }
}
