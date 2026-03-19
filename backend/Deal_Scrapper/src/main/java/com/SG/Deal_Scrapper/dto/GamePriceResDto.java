package com.SG.Deal_Scrapper.dto;

import com.SG.Deal_Scrapper.Models.Price_history;
import lombok.Data;

import java.util.List;

@Data
public class GamePriceResDto {

    public String message;

    public List<Price_history> result = null;
}
