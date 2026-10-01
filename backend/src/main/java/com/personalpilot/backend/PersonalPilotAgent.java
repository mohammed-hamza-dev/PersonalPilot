package com.personalpilot.backend;

import org.springframework.stereotype.Service;

@Service
public class PersonalPilotAgent {

    public String process(String message) {

        return "Agent received: " + message;
    }
}