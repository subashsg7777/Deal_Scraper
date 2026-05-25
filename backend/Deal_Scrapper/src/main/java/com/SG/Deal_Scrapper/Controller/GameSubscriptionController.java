package com.SG.Deal_Scrapper.Controller;

import com.SG.Deal_Scrapper.Models.GameSubscription;
import com.SG.Deal_Scrapper.Repo.GameSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/game-subscriptions")
public class GameSubscriptionController {

    private final GameSubscriptionRepository gameSubscriptionRepository;

    @PostMapping
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String gameId = request.get("gameId");
        String gameName = request.get("gameName");

        if (email == null || email.trim().isEmpty() || gameId == null || gameId.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email and gameId are required"));
        }

        // Check if user already subscribed to this game
        Optional<GameSubscription> existingSubscription = gameSubscriptionRepository.findByEmailAndGameId(email, gameId);
        if (existingSubscription.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "You are already subscribed to price alerts for " + gameName));
        }

        // Save new game subscription
        GameSubscription subscription = new GameSubscription(email, gameId, gameName);
        gameSubscriptionRepository.save(subscription);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Successfully subscribed to " + gameName + " price alerts!"));
    }
}
