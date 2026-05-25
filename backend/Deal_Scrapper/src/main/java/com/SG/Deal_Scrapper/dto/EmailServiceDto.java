package com.SG.Deal_Scrapper.dto;

import lombok.Data;

@Data
public class EmailServiceDto {

    private String email;
    private String name;
    private double newPrice;
    private double oldPrice;
}
