package com.example.Chat.Repositry;

import com.example.Chat.models.ChatMessage;
import com.example.Chat.models.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.mongodb.repository.Query;


public interface Userrepositry extends MongoRepository<User, String>,UserrepositryCustom {

    Optional<User> findByEmailAndPassword(String email, String password);

    @Query(value = "{ 'email' : { $ne : ?0 } }", fields = "{ 'email' : 1 }")
    List<User> findAllExcept(String loggedInUserEmail);


   


}
