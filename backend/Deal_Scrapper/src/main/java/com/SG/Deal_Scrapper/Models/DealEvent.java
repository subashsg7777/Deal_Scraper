package com.SG.Deal_Scrapper.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "deal_events")
public class DealEvent {

    @Id
    private String id;

    private String gameId;

    private String name;

    private String store;

    private double oldPrice;

    private double newPrice;

    private double discountPercent;

    private Instant detectedAt;
}