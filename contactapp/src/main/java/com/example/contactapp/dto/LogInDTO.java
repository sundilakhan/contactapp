package com.example.contactapp.dto;

public class LogInDTO {
    private String username;
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LogInDTO(String email,String password) {
        this.email = email;
        this.password = password;
    }
    public LogInDTO(){}
}
