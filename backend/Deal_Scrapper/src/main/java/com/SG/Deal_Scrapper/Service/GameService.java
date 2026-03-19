package com.SG.Deal_Scrapper.Service;

import com.SG.Deal_Scrapper.Models.DealEvent;
import com.SG.Deal_Scrapper.Models.Games;
import com.SG.Deal_Scrapper.Models.Price_history;
import com.SG.Deal_Scrapper.Repo.DealEventRepository;
import com.SG.Deal_Scrapper.Repo.GameRepository;
import com.SG.Deal_Scrapper.Repo.Price_historyRepository;
import com.SG.Deal_Scrapper.dto.DealResDto;
import com.SG.Deal_Scrapper.dto.LatestPrice;
import com.SG.Deal_Scrapper.dto.LatestPricePerStoreResDto;
import com.SG.Deal_Scrapper.dto.PricePoint;
import com.SG.Deal_Scrapper.dto.ScarapperInsertReqDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private static final Logger log = LoggerFactory.getLogger(GameService.class);
    public final GameRepository gameRepository;
    public final Price_historyRepository priceHistoryRepository;
    private final MongoTemplate mongoTemplate;
    private final DealEventRepository dealEventRepository;

    public List<Games> getAllGames(){
        return gameRepository.findAll();
    }

    public List<DealResDto> getLatestDeals() {
        return dealEventRepository.findTop50ByOrderByDetectedAtDesc()
                .stream()
                .map(event -> {
                    DealResDto dto = new DealResDto();
                    dto.setGameId(event.getGameId());
                    dto.setGameName(event.getName());
                    dto.setStore(event.getStore());
                    dto.setOldPrice(event.getOldPrice());
                    dto.setNewPrice(event.getNewPrice());
                    dto.setDiscountPercent(event.getDiscountPercent());
                    dto.setDetectedAt(event.getDetectedAt());
                    return dto;
                })
                .toList();
    }

    public List<Games> searchGame(String term){
        if(term == null || term.trim().length() < 4){
            throw new UnsupportedOperationException("Provide search term with at least 4 characters");
        }
        log.info("Searching DB");
        return gameRepository.findByNameContainingIgnoreCase(term);
    }

    public List<Price_history> getGamePrice(String game_id){
        return priceHistoryRepository.findAllByGameIdContaining(game_id);
    }

    public boolean insertHistory(ScarapperInsertReqDto dto) {

        Optional<Price_history> recentPrice =
                priceHistoryRepository.findTopByGameIdAndStoreOrderByScrapedAtDesc(
                        dto.getGameId(),
                        dto.getStore()
                );


        if (recentPrice.isPresent() &&
                Objects.equals(recentPrice.get().getPrice(), dto.getPrice())) {
            return true;
        }

        double newPrice = dto.getPrice();


        if (recentPrice.isPresent()) {

            double oldPrice = recentPrice.get().getPrice();

            if (newPrice < oldPrice) {

                double discount = ((oldPrice - newPrice) / oldPrice) * 100;

                if (discount >= 5) {

                    Optional<Games> game = gameRepository.findById(dto.getGameId());
                    if(game.isEmpty()){
                        return false;
                    }
                    String game_name = game.get().getName();
                    DealEvent deal = new DealEvent();
                    deal.setGameId(dto.getGameId());
                    deal.setStore(dto.getStore());
                    deal.setOldPrice(oldPrice);
                    deal.setNewPrice(newPrice);
                    deal.setDiscountPercent(discount);
                    deal.setDetectedAt(Instant.now());
                    deal.setName(game_name);

                    dealEventRepository.save(deal);
                }
            }
        }


        Price_history history = new Price_history();
        history.setGameId(dto.getGameId());
        history.setStore(dto.getStore());
        history.setPrice(newPrice);
        history.setCurrency(dto.getCurrency());
        history.setScrapedAt(Instant.now());

        priceHistoryRepository.save(history);

        return true;
    }

    public Games getGame(String id){
        return gameRepository.findById(id).orElseThrow(() -> {throw new UnsupportedOperationException("No Game Found");});
    }

    public Map<String, List<PricePoint>> getGameHistory(String gameId, int days) {

        Instant cutoff = Instant.now().minus(days, ChronoUnit.DAYS);

        List<Price_history> history =
                priceHistoryRepository.findByGameIdAndScrapedAtAfterOrderByScrapedAtAsc(gameId, cutoff);

        Map<String, List<PricePoint>> result = new HashMap<>();

        for (Price_history h : history) {
            PricePoint point = new PricePoint();
            point.setPrice(h.getPrice());
            point.setScrapedAt(h.getScrapedAt());
            result
                    .computeIfAbsent(h.getStore(), k -> new ArrayList<>())
                    .add(point);
        }

        return result;
    }

    public Optional<?> getRecentPriceByStore(String game_id, String store){
        return priceHistoryRepository.findTopByGameIdAndStoreOrderByScrapedAtDesc(game_id,store);
    }

    public LatestPricePerStoreResDto getLatestPricePerStore(String game_id){
        String gameName = gameRepository.findById(game_id)
            .map(Games::getName)
            .orElse(null);

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("gameId").is(game_id)),
            Aggregation.sort(Sort.Direction.DESC, "scrapedAt"),
                Aggregation.group("store")
                        .first("price").as("price")
                .first("scrapedAt").as("scrapedAt")
                        .first("store").as("store")
                        .first("currency").as("currency")
        );

        AggregationResults<LatestPrice> latestPrices = mongoTemplate.aggregate(aggregation,"price_history",LatestPrice.class);

        List<LatestPrice> results = latestPrices.getMappedResults();

        double lowest = Double.MAX_VALUE;
        String cheapestStore = null;

        for (LatestPrice p : results) {
            if (p.getPrice() < lowest) {
                lowest = p.getPrice();
                cheapestStore = p.getStore();
            }
        }

        LatestPricePerStoreResDto latestPricePerStoreResDto = new LatestPricePerStoreResDto();
        latestPricePerStoreResDto.setGameName(gameName);
        latestPricePerStoreResDto.setResults(results);
        latestPricePerStoreResDto.setCheapestStore(cheapestStore);
        latestPricePerStoreResDto.setCheapestPrice(lowest);
        latestPricePerStoreResDto.setCurrency("INR");
        latestPricePerStoreResDto.setLastUpdatedAt(results.isEmpty() ? null : results.getFirst().getScrapedAt());

        return latestPricePerStoreResDto;
    }
}
