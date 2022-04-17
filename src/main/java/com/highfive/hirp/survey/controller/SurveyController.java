package com.highfive.hirp.survey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.survey.service.SurveyService;

@Controller
public class SurveyController {
	@Autowired
	private SurveyService sService;
	
}
