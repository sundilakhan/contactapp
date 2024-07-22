package com.example.contactapp.repo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.contactapp.Domain.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    Page<Contact> findAllByUserId(Long userId, Pageable pageable);
}

