package com.personalpilot.backend;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final PersonalPilotAgent agent;

    public ChatService(PersonalPilotAgent agent) {
        this.agent = agent;
    }

    public String processMessage(String message) {
        return agent.process(message);
    }
}