package com.SG.Deal_Scrapper.Repo;

import com.SG.Deal_Scrapper.Models.Subscriber;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface SubscriberRepository extends MongoRepository<Subscriber, String> {
    Optional<Subscriber> findByEmail(String email);
}
