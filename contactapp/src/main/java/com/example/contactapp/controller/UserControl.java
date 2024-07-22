package com.example.contactapp.controller;

import com.example.contactapp.dto.UserDTO;
import com.example.contactapp.dto.LogInDTO;
import com.example.contactapp.response.LogInResponse;
import com.example.contactapp.service.LogInService;
import com.example.contactapp.service.UserService;
import com.example.contactapp.util.Jwtutil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserControl {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LogInService loginService;

    @Autowired
    private Jwtutil jwtUtil;

    @Autowired
    private UserService userService; // Autowire UserService

    private static final Logger logger = LoggerFactory.getLogger(UserControl.class);

    // Method to show login page
    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // Ensure you have a login.html template
    }

    // Method to handle login from form submission
    @PostMapping("/login")
    public String handleLogin(@RequestParam String username, @RequestParam String password, Model model) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtil.generateToken(authentication);
            model.addAttribute("jwt", jwt);
            return "redirect:/dashboard"; // Redirect to a dashboard or home page on successful login
        } catch (Exception e) {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    // Method to show registration page
    @GetMapping("/register")
    public String showRegistrationPage() {
        return "register"; // Ensure you have a register.html template
    }

    // Method to handle registration from form submission
    @PostMapping("/register")
    public String handleRegistration(@RequestParam String username, @RequestParam String password) {
        try {
            UserDTO userDto = new UserDTO();
            userDto.setUsername(username);
            userDto.setPassword(password);
            userService.saveUser(userDto);
            return "redirect:/users/login"; // Redirect to login page after successful registration
        } catch (Exception e) {
            // Handle registration error
            return "register";
        }
    }

    // Method to save user (for API)
    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDto) {
        try {
            logger.debug("Received UserDto: {}", userDto);
            UserDTO savedUser = userService.saveUser(userDto); // Use autowired userService
            logger.debug("Saved UserDto: {}", savedUser);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            logger.error("Error saving user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Method to login (for API)
    @PostMapping("/login/api")
    public ResponseEntity<LogInResponse> apiLogin(@RequestBody LoginRequest loginRequest) {
        try {
            logger.debug("Received LoginRequest: {}", loginRequest);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtil.generateToken(authentication);
            logger.debug("Generated JWT token for user: {}", loginRequest.getUsername());

            return ResponseEntity.ok(new LogInResponse(jwt, "Login successful", true));
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LogInResponse("Invalid username or password", false));
        }
    }
}
