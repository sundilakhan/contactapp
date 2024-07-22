package com.example.contactapp.service;

import com.example.contactapp.Domain.Contact;
import com.example.contactapp.repo.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContactService {
    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final String PHOTO_DIRECTORY = "C:/uploads/photos";

    private final ContactRepository contactRepo;


    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }

    public Contact getContact(Long id) {
        return contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    public Page<Contact> getAllContactsPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName"));
        return contactRepo.findAll(pageable);
    }

    public Page<Contact> getAllContactsByUserId(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName"));
        return contactRepo.findAllByUserId(userId, pageable);
    }

    @Transactional
    public Contact createContact(Contact contact) {
        log.info("Creating new contact: {}", contact);
        return contactRepo.save(contact);
    }

    @Transactional
    public void deleteContact(Long id) {
        contactRepo.deleteById(id);
        log.info("Deleted contact with id: {}", id);
    }

    @Transactional
    public Contact updateContact(Long id, Contact updatedContact) {
        Contact existingContact = getContact(id);
        existingContact.setFirstName(updatedContact.getFirstName());
        existingContact.setLastName(updatedContact.getLastName());
        // Update other fields as needed
        return contactRepo.save(existingContact);
    }

    @Transactional
    public String uploadPhoto(Long id, MultipartFile file) {
        log.info("Saving picture for contact ID: {}", id);
        Contact contact = getContact(id);
        String photoUrl = savePhoto(id, file);
        contact.setPhotoUrl(photoUrl);
        contactRepo.save(contact);
        return photoUrl;
    }

    private String savePhoto(Long id, MultipartFile file) {
        String filename = id + getFileExtension(file.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(file.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/contacts/image/" + filename).toUriString();
        } catch (IOException ex) {
            throw new RuntimeException("Unable to save image", ex);
        }
    }

    private String getFileExtension(String filename) {
        return Optional.ofNullable(filename)
                .filter(name -> name.contains("."))
                .map(name -> "." + name.substring(name.lastIndexOf(".") + 1))
                .orElse(".png");
    }
}
