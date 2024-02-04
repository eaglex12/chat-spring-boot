package com.example.Chat.Repositry;


import com.example.Chat.models.ChatMessage;
import com.example.Chat.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class UserrepositryCustomImpl implements UserrepositryCustom {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserrepositryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void updateFriendMessages(String currentUserEmail, String friendEmail, ChatMessage message) {
        Query query = new Query(Criteria.where("email").is(currentUserEmail).and("friends.email").is(friendEmail));
        Update update = new Update().push("friends.$.messages", message);
        mongoTemplate.updateFirst(query, update, User.class);
    }
}
