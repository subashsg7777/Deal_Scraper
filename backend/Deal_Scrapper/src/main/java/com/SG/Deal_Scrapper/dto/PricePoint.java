package com.SG.Deal_Scrapper.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class PricePoint {

    private double price;
    private Instant scrapedAt;
}
