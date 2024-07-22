package com.example.contactapp.controller;

import com.example.contactapp.Domain.Contact;
import com.example.contactapp.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/contacts")
public class contactControl {

    @Autowired
    private ContactService contactService;

    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts(){
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact newContact = contactService.createContact(contact);
        return ResponseEntity.ok(newContact);
    }

    // Other methods...
}
