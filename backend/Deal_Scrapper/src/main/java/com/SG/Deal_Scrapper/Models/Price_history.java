package com.SG.Deal_Scrapper.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "price_history")
@Data
public class Price_history {

    @Id
    private String id;

    private String gameId;

    private String store;

    private Double price;

    private String currency;

    private Instant scrapedAt;

}
