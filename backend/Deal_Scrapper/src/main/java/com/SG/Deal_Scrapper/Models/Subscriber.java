package com.SG.Deal_Scrapper.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "subscribers")
public class Subscriber {

    @Id
    private String id;

    private String email;

    private LocalDateTime subscribedAt;

    public Subscriber() {
        this.subscribedAt = LocalDateTime.now();
    }

    public Subscriber(String email) {
        this.email = email;
        this.subscribedAt = LocalDateTime.now();
    }
}
