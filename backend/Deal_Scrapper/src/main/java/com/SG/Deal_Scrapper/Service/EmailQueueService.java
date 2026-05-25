package com.SG.Deal_Scrapper.Service;

import com.SG.Deal_Scrapper.dto.EmailServiceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
@RequiredArgsConstructor
public class EmailQueueService {

    private final Queue<EmailServiceDto> queue = new ConcurrentLinkedQueue<>();

    public void addToQueue(EmailServiceDto emailServiceDto){
        queue.add(emailServiceDto);
    }


    public EmailServiceDto poll() {
        return queue.poll();
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }
}
