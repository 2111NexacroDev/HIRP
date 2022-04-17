package com.highfive.hirp.employee.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.highfive.hirp.employee.service.EmployeeService;

@Controller
public class EmployeeController {
	@Autowired
	private EmployeeService eService;
}
