package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greet")
public class GreetingsCtrl {

    // Greetings map
    static Map<String, String> greetings;

    // Initialize greetings at startup
    static {
        greetings = new HashMap<>();
        greetings.put("fr", "BONJOUR");
        greetings.put("es", "HOLA");
        greetings.put("de", "GUTENTAG");
        greetings.put("it", "CIAO");
        greetings.put("hi", "नमस्ते");
        greetings.put("en", "GOOD MORNING");
        greetings.put("jp", "ohayo gozaimasu");
    }

    @GetMapping("/welcome/{localeId}")
    public String getGreetings(@PathVariable("localeId") String langCode) {
        System.out.println("Fetching greetings type for locale id = " + langCode);

        String msg = greetings.entrySet()
                .stream()
                .filter(code -> langCode.equalsIgnoreCase(code.getKey()))
                .map(Map.Entry::getValue)
                .collect(Collectors.joining());

        return msg;
    }
}
