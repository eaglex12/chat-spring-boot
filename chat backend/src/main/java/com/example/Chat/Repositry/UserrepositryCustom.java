package com.example.Chat.Repositry;

import com.example.Chat.models.ChatMessage;

public interface UserrepositryCustom {
    void updateFriendMessages(String currentUserEmail, String friendEmail, ChatMessage message);
}