package com.SG.Deal_Scrapper.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private final String[] allowedOrigins;
    private final String[] allowedOriginPatterns;

    public CorsConfig(
            @Value("${app.cors.allowed-origins:http://localhost:5173,http://127.0.0.1:5173,https://deal-scraper.vercel.app}")
            String[] allowedOrigins,
            @Value("${app.cors.allowed-origin-patterns:https://*.vercel.app}")
            String[] allowedOriginPatterns
    ) {
        this.allowedOrigins = normalize(allowedOrigins);
        this.allowedOriginPatterns = normalize(allowedOriginPatterns);
    }

    private String[] normalize(String[] values) {
        return Arrays.stream(values)
                .map(String::trim)
                .map(origin -> origin.endsWith("/") ? origin.substring(0, origin.length() - 1) : origin)
                .filter(origin -> !origin.isBlank())
                .toArray(String[]::new);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        var cors = registry.addMapping("/api/**")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);

        if (allowedOrigins.length > 0) {
            cors.allowedOrigins(allowedOrigins);
        }

        if (allowedOriginPatterns.length > 0) {
            cors.allowedOriginPatterns(allowedOriginPatterns);
        }
    }
}
