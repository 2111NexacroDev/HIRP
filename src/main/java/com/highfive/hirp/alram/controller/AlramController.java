package com.highfive.hirp.alram.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.alram.service.AlramService;

@Controller
public class AlramController {
	
	@Autowired
	private AlramService aService;
}
