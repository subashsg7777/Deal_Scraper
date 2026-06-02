package com.SG.Deal_Scrapper.Config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ActiveProfileSanitizingEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    private static final String PROPERTY_SOURCE_NAME = "sanitizedActiveProfiles";
    private static final String MONGO_PROPERTY_SOURCE_NAME = "sanitizedMongoConnectionString";
    private static final String PROFILE_PATTERN = "^[A-Za-z0-9._+@-]+$";
    private static final String MONGODB_URI_PATTERN = "^(mongodb://|mongodb\\+srv://).+";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        sanitizeMongoConnectionString(environment);
        sanitizeActiveProfiles(environment);
    }

    private void sanitizeActiveProfiles(ConfigurableEnvironment environment) {
        String rawProfiles = environment.getProperty("spring.profiles.active");
        if (rawProfiles == null || rawProfiles.isBlank()) {
            return;
        }

        List<String> validProfiles = Arrays.stream(rawProfiles.split(","))
                .map(String::trim)
                .filter(profile -> !profile.isBlank())
                .filter(profile -> profile.matches(PROFILE_PATTERN))
                .collect(Collectors.toList());

        String sanitizedProfiles = validProfiles.isEmpty() ? "default" : String.join(",", validProfiles);
        if (sanitizedProfiles.equals(rawProfiles.trim())) {
            return;
        }

        environment.getPropertySources().addFirst(
                new MapPropertySource(PROPERTY_SOURCE_NAME, Map.of("spring.profiles.active", sanitizedProfiles))
        );
    }

    private void sanitizeMongoConnectionString(ConfigurableEnvironment environment) {
        String rawMongoUri = firstNonBlank(
                environment.getProperty("spring.data.mongodb.uri"),
                environment.getProperty("spring.mongodb.uri"),
                environment.getProperty("DB_MONGO_DB_URI")
        );

        if (rawMongoUri == null) {
            return;
        }

        String sanitizedMongoUri = normalizeMongoConnectionString(rawMongoUri);
        if (sanitizedMongoUri == null || sanitizedMongoUri.equals(rawMongoUri)) {
            return;
        }

        Map<String, Object> overrides = new LinkedHashMap<>();
        overrides.put("spring.data.mongodb.uri", sanitizedMongoUri);
        overrides.put("spring.mongodb.uri", sanitizedMongoUri);
        overrides.put("DB_MONGO_DB_URI", sanitizedMongoUri);

        environment.getPropertySources().addFirst(
                new MapPropertySource(MONGO_PROPERTY_SOURCE_NAME, overrides)
        );
    }

    private String normalizeMongoConnectionString(String value) {
        String trimmed = value.trim();
        if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
            trimmed = trimmed.substring(1, trimmed.length() - 1).trim();
        }

        if (trimmed.matches(MONGODB_URI_PATTERN)) {
            return trimmed;
        }

        int equalsIndex = trimmed.indexOf('=');
        if (equalsIndex > -1) {
            String candidate = trimmed.substring(equalsIndex + 1).trim();
            if (candidate.matches(MONGODB_URI_PATTERN)) {
                return candidate;
            }
        }

        return trimmed;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}