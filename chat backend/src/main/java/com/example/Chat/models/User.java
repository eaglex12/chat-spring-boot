package com.example.Chat.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Users")
public class User {

    @Id
    private String id;

    private String email;

    private String password;
    private boolean status;

    private List<Friend> friends;

    public static class Friend {
        private String email;
        private boolean status;
        private List<Message> messages;

        public static class Message {
            private String senderEmail;
            private String text;
            private long timestamp; // timestamp in milliseconds

            public Message(String senderEmail, String text, long timestamp) {
                this.senderEmail = senderEmail;
                this.text = text;
                this.timestamp = timestamp;
            }

            // getters, setters, etc.
            public String getSenderEmail() {
                return senderEmail;
            }

            public void setSenderEmail(String senderEmail) {
                this.senderEmail = senderEmail;
            }

            public String getText() {
                return text;
            }

            public void setText(String text) {
                this.text = text;
            }

            public long getTimestamp() {
                return timestamp;
            }

            public void setTimestamp(long timestamp) {
                this.timestamp = timestamp;
            }
        }

        public Friend(String email, boolean status, List<Message> messages) {
            this.email = email;
            this.status = status;
            this.messages = messages;
        }

        // getters, setters, etc.
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public boolean isStatus() {
            return status;
        }

        public void setStatus(boolean status) {
            this.status = status;
        }

        public List<Message> getMessages() {
            return messages;
        }

        public void setMessages(List<Message> messages) {
            this.messages = messages;
        }
    }
    public User() {
        // Empty constructor
    }
    

    public User(String email, String password,boolean status, List<Friend> friends) {
        this.email = email;
        this.password = password;
        this.status = status;

        this.friends = friends;
    }

    // getters, setters, etc.
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Friend> getFriends() {
        return friends;
    }

    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }
}
