package com.highfive.hirp.dept.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.alram.service.AlramService;
import com.highfive.hirp.dept.service.DeptService;

@Controller
public class DeptController {
	@Autowired
	private DeptService dService;
}
