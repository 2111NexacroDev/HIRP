package com.highfive.hirp;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.todo.domain.Todo;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	// 프론트 가이드페이지
	@RequestMapping(value="/guide.hirp", method=RequestMethod.GET)
	public ModelAndView guideView(ModelAndView mv) {
		mv.setViewName("guide");
		return mv;
	}
	
	// 넥사크로 관리자 페이지
	@RequestMapping(value = "/admin.hirp", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		NexacroResult result = new NexacroResult();
		return "redirect:/nexaui/index.html";
	}
}