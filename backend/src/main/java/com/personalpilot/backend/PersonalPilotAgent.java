package com.personalpilot.backend;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class PersonalPilotAgent {

    private final ChatClient chatClient;

    public PersonalPilotAgent(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String process(String message) {

        return chatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }
}