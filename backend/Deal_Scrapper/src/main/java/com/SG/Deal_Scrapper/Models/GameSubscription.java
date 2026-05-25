package com.SG.Deal_Scrapper.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "game_subscriptions")
public class GameSubscription {

    @Id
    private String id;

    private String email;

    private String gameId;

    private String gameName;

    private LocalDateTime subscribedAt;

    public GameSubscription() {
        this.subscribedAt = LocalDateTime.now();
    }

    public GameSubscription(String email, String gameId, String gameName) {
        this.email = email;
        this.gameId = gameId;
        this.gameName = gameName;
        this.subscribedAt = LocalDateTime.now();
    }
}
