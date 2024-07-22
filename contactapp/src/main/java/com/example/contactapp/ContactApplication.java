package com.example.contactapp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.contactapp.repo")
@EntityScan(basePackages = "com.example.contactapp.entity")
public class ContactApplication {
	public static void main(String[] args) {
		SpringApplication.run(ContactApplication.class, args);
	}
}

