package com.SG.Deal_Scrapper.dto;

import com.SG.Deal_Scrapper.Models.Games;
import lombok.Data;

import java.util.List;

@Data
public class GameSearchReqDto {

    public String message;

    public List<Games> result = null;
}
