package com.SG.Deal_Scrapper.Controller;

import com.SG.Deal_Scrapper.Service.GameService;
import com.SG.Deal_Scrapper.dto.DealResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class DealController {

    private final GameService gameService;

    @GetMapping("deals")
    public ResponseEntity<List<DealResDto>> getDeals() {
        return ResponseEntity.ok(gameService.getLatestDeals());
    }
}
