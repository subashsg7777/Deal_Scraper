package com.SG.Deal_Scrapper.Service;

import com.SG.Deal_Scrapper.dto.EmailServiceDto;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${app.email.resend.api-key:${RESEND_API_KEY:}}")
    private String apiKey;

    @Value("${app.email.from:Game Tracker <onboarding@resend.dev>}")
    private String fromAddress;

    private final OkHttpClient client = new OkHttpClient();

    private String escapeJson(String value) {
        if (value == null) {
            return "";
        }
        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "")
                .replace("\r", "");
    }

    public void sendEmail(EmailServiceDto emailServiceDto){
        try{
            String safeEmail = escapeJson(emailServiceDto.getEmail());
            String safeName = escapeJson(emailServiceDto.getName());
            String html = "<h2>%s is now cheaper!</h2><p>New Price: Rs %.2f</p><p>Grab the deal before it's gone.</p>"
                    .formatted(safeName, emailServiceDto.getNewPrice());
            String safeHtml = escapeJson(html);

            String jsonBody = "{"
                    + "\"from\":\"" + escapeJson(fromAddress) + "\"," 
                    + "\"to\":[\"" + safeEmail + "\"],"
                    + "\"subject\":\"Price Drop ALERT\","
                    + "\"html\":\"" + safeHtml + "\""
                    + "}";

            RequestBody requestBody = RequestBody.create(
                    jsonBody,
                    MediaType.parse("application/json")
            );

            Request request  = new Request.Builder().url("https://api.resend.com/emails").post(requestBody)
                    .addHeader("Authorization","Bearer "+apiKey)
                    .addHeader("Content-Type","application/json")
                    .build();

            Response response = client.newCall(request).execute();
            String responseBody = response.body() != null ? response.body().string() : "";

            if (!response.isSuccessful()) {
                System.out.println("Email failed (" + response.code() + "): " + responseBody);
            } else {
                System.out.println("Email accepted by Resend (" + response.code() + ") for: " + emailServiceDto.getEmail() + " response=" + responseBody);
            }
        }

        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
