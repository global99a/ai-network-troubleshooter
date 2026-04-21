package com.network_ai_backend.network_ai.controller;


import org.springframework.web.bind.annotation.*;

import com.network_ai_backend.network_ai.service.AIService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class NetworkController {

    private final AIService aiService;

    public NetworkController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public String analyze(@RequestBody String log) {
        return aiService.getAnalysis(log);
    }
}
