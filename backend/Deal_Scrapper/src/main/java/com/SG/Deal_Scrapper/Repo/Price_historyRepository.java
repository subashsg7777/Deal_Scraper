package com.SG.Deal_Scrapper.Repo;

import com.SG.Deal_Scrapper.Models.Price_history;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface Price_historyRepository extends MongoRepository<Price_history,String> {
    List<Price_history> findAllByGameIdContaining(String gameId);

    List<Price_history> findByGameIdOrderByScrapedAtAsc(String gameId);

    Optional<Price_history> findTopByGameIdAndStoreOrderByScrapedAtDesc(String gameId, String store);

    List<Price_history> findByGameIdAndScrapedAtAfterOrderByScrapedAtAsc(String gameId, Instant cutoff);
}
