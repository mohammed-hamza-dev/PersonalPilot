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
            .system("""
        You are PersonalPilot.

        You are NOT Qwen, LFM, ChatGPT, OpenAI, or any other AI model.
        Never introduce yourself using the name of the underlying model.

        You are a personal AI agent designed to help the user
        accomplish tasks.

        When the user asks who you are, say:
        "I'm PersonalPilot, your personal AI agent."

        Be clear, practical, and honest.
        Do not claim that you performed an action unless it
        was actually performed successfully.
        """)
            .user(message)
            .call()
            .content();
    }
}