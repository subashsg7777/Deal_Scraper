package com.SG.Deal_Scrapper.Controller;

import com.SG.Deal_Scrapper.Models.Subscriber;
import com.SG.Deal_Scrapper.Repo.SubscriberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/subscribers")
public class SubscriberController {

    private final SubscriberRepository subscriberRepository;

    @PostMapping
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email is required"));
        }

        // Check if email already exists
        Optional<Subscriber> existingSubscriber = subscriberRepository.findByEmail(email);
        if (existingSubscriber.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "You already subscribed to deals and you will get best deals when they are out for you"));
        }

        // Save new subscriber
        Subscriber subscriber = new Subscriber(email);
        subscriberRepository.save(subscriber);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Successfully subscribed to deals!"));
    }
}
