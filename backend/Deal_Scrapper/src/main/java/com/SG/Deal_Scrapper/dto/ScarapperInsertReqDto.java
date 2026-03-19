package com.SG.Deal_Scrapper.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ScarapperInsertReqDto {

    @NotBlank
    public String gameId;

    @NotBlank
    public String store;

    @NotNull
    public Double price;

    @NotBlank
    public String currency;
}
