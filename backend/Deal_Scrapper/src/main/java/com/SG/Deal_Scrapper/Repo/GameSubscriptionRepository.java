package com.SG.Deal_Scrapper.Repo;

import com.SG.Deal_Scrapper.Models.GameSubscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface GameSubscriptionRepository extends MongoRepository<GameSubscription, String> {
    Optional<GameSubscription> findByEmailAndGameId(String email, String gameId);
    List<GameSubscription> findByGameId(String gameId);
    List<GameSubscription> findByEmail(String email);
}
