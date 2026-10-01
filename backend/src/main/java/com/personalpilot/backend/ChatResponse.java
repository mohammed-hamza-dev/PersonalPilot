package com.personalpilot.backend;

public class ChatResponse {

    private String message;

    public ChatResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}