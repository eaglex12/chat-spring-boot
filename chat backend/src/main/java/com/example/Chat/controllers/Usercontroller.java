package com.example.Chat.controllers;

import com.example.Chat.Repositry.Userrepositry;
import com.example.Chat.models.ChatMessage;
import com.example.Chat.models.User;
import com.example.Chat.Resources.Userrequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/users")

public class Usercontroller {

    private final Userrepositry userrepositry;
    private final ObjectMapper objectMapper; // Autowire or instantiate ObjectMapper
    private final SimpMessagingTemplate messagingTemplate;


    @Autowired
    public Usercontroller(Userrepositry userrepositry, SimpMessagingTemplate messagingTemplate, ObjectMapper objectMapper) {
        this.userrepositry = userrepositry;
        this.messagingTemplate = messagingTemplate;
        this.objectMapper = objectMapper;
    }

    @MessageMapping("/chat/{friendEmail}")
    public void sendChatMessage(@DestinationVariable String friendEmail, @Payload ChatMessage chatMessage) {
        String senderEmail = getCurrentUserEmail();

        // Update the friend's messages in the database
        userrepositry.updateFriendMessages(senderEmail, friendEmail, chatMessage);

        // Send the message to the friend's chat topic
        String friendTopic = "/topic/chat/" + friendEmail;
        messagingTemplate.convertAndSend(friendTopic, chatMessage);
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
        List<User.Friend> friends = Collections.emptyList(); // or initialize with existing friends if needed
        User user = new User(userrequest.getEmail(), userrequest.getPassword(), true, friends);
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
        User user = new User(userRequest.getEmail(), userRequest.getPassword(), true, Collections.emptyList());

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

    private String getCurrentUserEmail() {
        // Implement logic to get the current user's email
        return "lauda";
    }
    
}
