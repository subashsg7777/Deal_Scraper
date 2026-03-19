package com.SG.Deal_Scrapper.Repo;

import com.SG.Deal_Scrapper.Models.DealEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DealEventRepository extends MongoRepository<DealEvent, String> {

    List<DealEvent> findTop50ByOrderByDetectedAtDesc();

}