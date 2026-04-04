package com.SG.Deal_Scrapper.Controller;

import com.SG.Deal_Scrapper.Models.Games;
import com.SG.Deal_Scrapper.Models.Price_history;
import com.SG.Deal_Scrapper.Service.GameService;
import com.SG.Deal_Scrapper.dto.GamePriceResDto;
import com.SG.Deal_Scrapper.dto.GameSearchReqDto;
import com.SG.Deal_Scrapper.dto.LatestPricePerStoreResDto;
import com.SG.Deal_Scrapper.dto.PricePoint;
import com.SG.Deal_Scrapper.dto.ScarapperInsertReqDto;
import com.mongodb.client.MongoClient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/games")
public class ScarapperController {

    private static final Logger log = LoggerFactory.getLogger(ScarapperController.class);
    public final GameService gameService;
    public final MongoTemplate mongoTemplate;
    public final MongoClient mongoClient;
    public final Environment environment;

    @GetMapping("debug")
    public ResponseEntity<Map<String, Object>> debug(){
        Map<String, List<String>> allDbsAndCollections = new java.util.LinkedHashMap<>();
        mongoClient.listDatabaseNames().forEach(dbName -> {
            List<String> cols = new ArrayList<>();
            mongoClient.getDatabase(dbName).listCollectionNames().into(cols);
            allDbsAndCollections.put(dbName, cols);
        });

        Set<String> currentCollections = mongoTemplate.getCollectionNames();
        List<Document> rawDocs = new ArrayList<>();
        for (String col : currentCollections) {
            List<Document> docs = mongoTemplate.getCollection(col).find(Document.class).limit(1).into(new ArrayList<>());
            if (!docs.isEmpty()) {
                Document sample = docs.get(0);
                sample.put("_collection", col);
                rawDocs.add(sample);
            }
        }

        List<String> connectedServers = mongoClient
                .getClusterDescription()
                .getServerDescriptions()
                .stream()
                .map(desc -> String.valueOf(desc.getAddress()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
            "currentDb", mongoTemplate.getDb().getName(),
            "connectedServers", connectedServers,
            "spring.mongodb.uri.present", environment.getProperty("spring.mongodb.uri") != null,
            "spring.data.mongodb.uri.present", environment.getProperty("spring.data.mongodb.uri") != null,
            "allDbsAndCollections", allDbsAndCollections,
            "sampleDocs", rawDocs
        ));
    }

    @GetMapping("all")
    public ResponseEntity<List<Games>> getAllGames(){
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("")
    public ResponseEntity<List<Games>> searchGameFrontend(@Validated @NotBlank @RequestParam String term) {
        return ResponseEntity.ok(gameService.searchGame(term));
    }

    @GetMapping("search")
    public ResponseEntity<GameSearchReqDto> searchGame(@Validated @NotBlank @RequestParam String term){
        List<Games> result = gameService.searchGame(term);
        GameSearchReqDto gameSearchReqDto = new GameSearchReqDto();
        if(result.isEmpty()){
            log.info("Result for empty case : " +result);
            gameSearchReqDto.setMessage("No Game Found for This Term");
            return ResponseEntity.status(HttpStatus.OK).body(gameSearchReqDto);
        }
        gameSearchReqDto.setMessage("Found the Following Results");
        gameSearchReqDto.setResult(result);
        return ResponseEntity.status(HttpStatus.OK).body(gameSearchReqDto);
    }

    @GetMapping("get-game")
    public ResponseEntity<Games> getGame(@Validated @NotBlank @RequestParam String id){

    Games game = gameService.getGame(id);
    return ResponseEntity.status(HttpStatus.OK).body(game);
    }

    @GetMapping("history")
    public ResponseEntity<?> getHistory(@Validated @NotBlank @RequestParam String game_id, @Validated @NotNull @RequestParam int days){

        Map<String, List<PricePoint>> result = gameService.getGameHistory(game_id, days);
        if(result.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No History Found for This Game");
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("{id}/history")
    public ResponseEntity<?> getHistoryFrontend(@PathVariable String id, @RequestParam(defaultValue = "90") int days) {
        Map<String, List<PricePoint>> result = gameService.getGameHistory(id, days);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("latest-per-store")
    public ResponseEntity<?> getLatestPerStore(@Validated @NotBlank @RequestParam String game_id){
        LatestPricePerStoreResDto results = gameService.getLatestPricePerStore(game_id);
        return ResponseEntity.status(HttpStatus.OK).body(results);
    }

    @GetMapping("{id}/prices")
    public ResponseEntity<?> getPricesFrontend(@PathVariable String id) {
        LatestPricePerStoreResDto results = gameService.getLatestPricePerStore(id);
        return ResponseEntity.status(HttpStatus.OK).body(results);
    }


    @GetMapping("prices")
    public ResponseEntity<?> getPrices(@Validated @NotNull @RequestParam String game_id){

        List<Price_history> histories = gameService.getGamePrice(game_id);

        GamePriceResDto gamePriceResDto = new GamePriceResDto();
        if(histories.isEmpty()){
            gamePriceResDto.setMessage("No History Found");
            return ResponseEntity.status(HttpStatus.OK).body(gamePriceResDto);
        }
        gamePriceResDto.setMessage("Got The following Response");
        gamePriceResDto.setResult(histories);
        return ResponseEntity.status(HttpStatus.OK).body(gamePriceResDto);
    }

    @PostMapping("prices")
    public ResponseEntity<String> scrapperInsertion(@Validated @RequestBody ScarapperInsertReqDto scarapperInsertReqDto){

        boolean result = gameService.insertHistory(scarapperInsertReqDto);
        if(result){
            return ResponseEntity.status(HttpStatus.OK).body("Insert Sucessfull");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error While Inserting from catch block");
    }

    @GetMapping("latest_price")
    public ResponseEntity<?> latestPriceForGame(@Validated @NotBlank @RequestParam String game_id, @Validated @NotBlank @RequestParam String store){

        Optional<?> result = gameService.getRecentPriceByStore(game_id,store);
        if(result.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Game Not Found in the Specified Store");
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

}