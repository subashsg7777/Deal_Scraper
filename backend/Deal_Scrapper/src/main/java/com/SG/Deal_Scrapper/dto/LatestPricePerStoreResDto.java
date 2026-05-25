package com.SG.Deal_Scrapper.dto;

import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
public class LatestPricePerStoreResDto {

    private String gameName;
    private String description;
    private List<LatestPrice> results;
    private String cheapestStore;
    private Double cheapestPrice;
    private String currency;
    private Instant lastUpdatedAt;
    private Map<String, String> storeLinks;
}
