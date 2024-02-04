package com.example.Chat.controllers;

import com.example.Chat.Repositry.Userrepositry;
import com.example.Chat.models.User;
import com.example.Chat.Resources.Userrequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;


import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/users")

public class Usercontroller {

    private final Userrepositry userrepositry;
    private final ObjectMapper objectMapper; // Autowire or instantiate ObjectMapper


    public Usercontroller(Userrepositry userrepositry, ObjectMapper objectMapper) {
        this.userrepositry = userrepositry;
        this.objectMapper = objectMapper;

    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userrepositry.findAll());
    }

    @GetMapping("/usernames/{loggedInUserEmail}")
    public ResponseEntity<String> getAllUserNamesExceptLoggedIn(@PathVariable String loggedInUserEmail) {
        List<User> allUsersExceptLoggedIn = userrepositry.findAllExcept(loggedInUserEmail);

        try {
            String jsonResponse = objectMapper.writeValueAsString(allUsersExceptLoggedIn);
            return ResponseEntity.ok(jsonResponse);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting to JSON");
        }
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody Userrequest userrequest) {
        User user = new User();
        user.setEmail(userrequest.getEmail());
        user.setPassword(userrequest.getPassword());
        return ResponseEntity.status(201).body(this.userrepositry.save(user));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity getUserById(@PathVariable String id) {
        Optional<User> user = this.userrepositry.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok("The user with id: " + id + " was not found.");
        }
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity deleteUserById(@PathVariable String id) {
        Optional<User> user = this.userrepositry.findById(id);
        if (user.isPresent()) {
            this.userrepositry.deleteById(id);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The user with id: " + id + " was not found.");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Userrequest userRequest) {

        
        // Map Userrequest to User entity
        User user = new User(userRequest.getEmail(), userRequest.getPassword());

        // Save the user to MongoDB
        userrepositry.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
     public ResponseEntity<String> login(@RequestBody Userrequest userRequest) {
    Optional<User> user = userrepositry.findByEmailAndPassword(userRequest.getEmail(), userRequest.getPassword());

    if (user.isPresent()) {
        // User found, login successful
        return ResponseEntity.ok("Login successful");
    } else {
        // User not found or password incorrect, login failed
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    
}


}