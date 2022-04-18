package com.highfive.hirp.favority.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.favority.service.FavorityService;

@Controller
public class FavorityController {

	@Autowired
	private FavorityService fService;
}
