package com.SG.Deal_Scrapper.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class DealResDto {
    private String gameId;
    private String gameName;
    private String store;
    private double oldPrice;
    private double newPrice;
    private double discountPercent;
    private Instant detectedAt;
}
