package com.highfive.hirp.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.chat.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService cService;
}
