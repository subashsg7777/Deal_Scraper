package com.SG.Deal_Scrapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DealScrapperApplication {

	public static void main(String[] args) {
		SpringApplication.run(DealScrapperApplication.class, args);
	}

}
