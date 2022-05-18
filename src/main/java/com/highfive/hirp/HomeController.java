package com.highfive.hirp;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	//private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	// 프론트 가이드페이지
	@RequestMapping(value="/guide.hirp", method=RequestMethod.GET)
	public ModelAndView guideView(ModelAndView mv) {
		mv.setViewName("guide");
		return mv;
	}
	
	// 넥사크로 관리자 페이지
	@RequestMapping(value = "/admin.hirp", method = RequestMethod.GET)
	public String adminView(Model model, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = (String) session.getAttribute("emplId");
		if(emplId.equals("admin")) {
			return "redirect:/nexaui/index.html";
		} else {
			// 아직 관리자 아닐 시 수행할 동작 추가 안함
			return "common/errorPage";
		}
	}
}