package com.example.Chat.models;

public class ChatMessage {

    private String senderEmail;
    private String text;
    private long timestamp;

    public ChatMessage(String senderEmail, String text, long timestamp) {
        this.senderEmail = senderEmail;
        this.text = text;
        this.timestamp = timestamp;
    }

    // Add getters and setters

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
