package com.example.contactapp.response;

public class LogInResponse {
    private String token;
    private String message;
    private boolean status;

    public LogInResponse(String token, String message, boolean status) {
        this.token = token;
        this.message = message;
        this.status = status;
    }
    public LogInResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    // Getters and setters
}
