package com.SG.Deal_Scrapper.Models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document(collection = "games")
public class Games {

    @Id
    private String id;

    private String name;

    private String publisher;

    private Map<String,String> stores;
}
