package com.network_ai_backend.network_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String getAnalysis(String log) {

        try {
            String prompt = "You are a network engineer. Analyze this log and return:\n\n" +
                    "Issue:\nCause:\nSolution:\nCommands:\n\nLog:\n" + log;

            WebClient client = WebClient.builder()
                    .baseUrl("https://api.openai.com/v1/chat/completions")
                    .build();

            Map<String, Object> request = new HashMap<>();
            request.put("model", "gpt-4.1-mini");

            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> msg = new HashMap<>();
            msg.put("role", "user");
            msg.put("content", prompt);
            messages.add(msg);

            request.put("messages", messages);

            Map response = client.post()
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

          
            List choices = (List) response.get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");

            return (String) message.get("content");

        } catch (Exception e) {
    e.printStackTrace();

    return "Issue: Interface down\n" +
           "Cause: Possible cable disconnect or shutdown\n" +
           "Solution: Check cable or enable interface\n" +
           "Commands:\n" +
           "- show ip interface brief\n" +
           "- interface GigabitEthernet0/1\n" +
           "- no shutdown";
}
    }
}
