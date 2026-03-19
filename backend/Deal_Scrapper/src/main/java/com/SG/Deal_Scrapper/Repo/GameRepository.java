package com.SG.Deal_Scrapper.Repo;

import com.SG.Deal_Scrapper.Models.Games;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameRepository extends MongoRepository<Games,String> {

    List<Games> findByNameContainingIgnoreCase(String term);

}
