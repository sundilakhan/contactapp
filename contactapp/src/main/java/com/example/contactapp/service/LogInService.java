package com.example.contactapp.service;

import com.example.contactapp.dto.LogInDTO;
import com.example.contactapp.dto.UserDTO;
import com.example.contactapp.entity.UserEntity;
import com.example.contactapp.repo.UserRepository;
import com.example.contactapp.response.LogInResponse;
import com.example.contactapp.util.Jwtutil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service("logInService")
public class LogInService {

    private static final Logger logger = LoggerFactory.getLogger(LogInService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Jwtutil jwtUtil;

    public String addUser(UserDTO userDTO) {
        try {
            logger.debug("Adding new user: {}", userDTO.getUsername());
            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(userDTO.getUsername());
            userEntity.setEmail(userDTO.getEmail());
            userEntity.setPassword(userDTO.getPassword()); // Assume already encoded
            userRepository.save(userEntity);
            logger.debug("User added successfully: {}", userEntity.getUsername());
            return userEntity.getId().toString();
        } catch (Exception e) {
            logger.error("Error adding user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to add user");
        }
    }

    public String generateToken(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken((Authentication) userDetails);
            logger.debug("Generated JWT token for user: {}", userDetails.getUsername());
            return token;
        } catch (Exception e) {
            logger.error("Error generating JWT token: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate token");
        }
    }

    public LogInResponse logInUser(LogInDTO logInDTO) {
        try {
            logger.debug("Attempting login for user: {}", logInDTO.getUsername());
            Optional<UserEntity> user = userRepository.findByUsername(logInDTO.getUsername());
            if (user.isPresent() && passwordEncoder.matches(logInDTO.getPassword(), user.get().getPassword())) {
                String token = generateToken(null); // Simplified for example
                logger.debug("Login successful for user: {}", logInDTO.getUsername());
                return new LogInResponse(token, "Login successful", true);
            } else {
                logger.warn("Invalid credentials provided for user: {}", logInDTO.getUsername());
                throw new RuntimeException("Invalid credentials");
            }
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage(), e);
            throw new RuntimeException("Login failed");
        }
    }
}