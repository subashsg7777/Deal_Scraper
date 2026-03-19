package com.SG.Deal_Scrapper.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class LatestPrice {

    private String store;
    private Double price;
    private Instant scrapedAt;

}