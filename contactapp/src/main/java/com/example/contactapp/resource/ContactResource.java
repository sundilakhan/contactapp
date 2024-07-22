package com.example.contactapp.resource;

import com.example.contactapp.Domain.Contact;
import com.example.contactapp.service.ContactService;
import com.example.contactapp.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
public class ContactResource {

    private final ContactService contactService;

    @PostMapping("/create") // Different endpoint
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact, @AuthenticationPrincipal CustomUserDetails userDetails) {
        // Ensure only the logged-in user's contacts are created
        contact.setUserId(userDetails.getId()); // Assuming setUserId() method exists in Contact class
        Contact createdContact = contactService.createContact(contact);
        URI location = URI.create("/contacts/" + createdContact.getId());
        return ResponseEntity.created(location).body(createdContact);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Contact>> getContacts(@RequestParam(value = "page", defaultValue = "0") int page,
                                                     @RequestParam(value = "size", defaultValue = "10") int size,
                                                     @AuthenticationPrincipal CustomUserDetails userDetails) {
        // Ensure only the logged-in user's contacts are fetched
        Page<Contact> contacts = contactService.getAllContactsByUserId(userDetails.getId(), page, size);
        return ResponseEntity.ok().body(contacts);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable(value = "id") Long id) {
        Contact contact = contactService.getContact(id);
        return ResponseEntity.ok().body(contact);
    }

    @PutMapping("/{id}/photo")
    public ResponseEntity<String> uploadPhoto(@PathVariable("id") Long id, @RequestParam("file") MultipartFile file) {
        String response = contactService.uploadPhoto(id, file);
        return ResponseEntity.ok().body(response);
    }
}
