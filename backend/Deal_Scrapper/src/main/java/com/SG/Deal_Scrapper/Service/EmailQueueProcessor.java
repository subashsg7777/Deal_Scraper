package com.SG.Deal_Scrapper.Service;

import com.SG.Deal_Scrapper.dto.EmailServiceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailQueueProcessor {

    private final EmailQueueService emailQueueService;
    private final EmailService emailService;

    @Scheduled(fixedDelay = 5000)
    public void processQueue(){

        while(!emailQueueService.isEmpty()){
            try{
                EmailServiceDto task = emailQueueService.poll();
                emailService.sendEmail(task);
                Thread.sleep(300);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
