package com.example.syFinal.global.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.example.syFinal.global.model.MessageDTO;

@RestController
public class WebSocketController {
	@Autowired
    private SimpMessagingTemplate template;
	
	@MessageMapping(value = "/message")
    public void message(MessageDTO message){
        template.convertAndSend("/sub/chatroom/" + message.getM_roomId(), message);
    }
}
