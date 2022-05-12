package com.highfive.hirp.board.reply.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.highfive.hirp.board.notice.service.NoticeBoardService;
import com.highfive.hirp.board.reply.domain.Reply;
import com.highfive.hirp.board.reply.service.ReplyService;
@Controller
public class ReplyController {

	@Autowired
	public ReplyService rService;
	
	
	// 공지글의 댓글 조회
		@ResponseBody
		@RequestMapping(value = "/reply/list.hirp", method = RequestMethod.GET)
		public void boardReplyView(@ModelAttribute Reply reply, HttpServletResponse response)
				throws JsonIOException, IOException {

			List<Reply> nReplyList = rService.printAllReply(reply);
			if (!nReplyList.isEmpty()) {
				Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
				gson.toJson(nReplyList, response.getWriter());

			}

		}

		// 공지글의 댓글 등록
		@ResponseBody
		@RequestMapping(value = "/reply/add.hirp", method = RequestMethod.POST)

		public String registerReply(@ModelAttribute Reply reply, HttpServletRequest request) {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			reply.setEmplId(emplId);

			int result = rService.registerReply(reply);
			if (result > 0) {
				return "success";
			} else {
				return "fail";
			}
		}

		// 공지글의 댓글 수정
		@ResponseBody
		@RequestMapping(value = "/reply/modify.hirp", method = RequestMethod.POST)
		public String modifyReply(@ModelAttribute Reply reply) {
			int result = rService.modifyReply(reply);
			if (result > 0) {
				return "success";
			} else {
				return "fail";
			}
		}

		// 대댓글 작성
		@ResponseBody
		@RequestMapping(value = "/register/reReply.hirp", method = RequestMethod.POST)

		public String addReReply(@ModelAttribute Reply reply, HttpServletRequest request) {
			HttpSession session = request.getSession();
			String emplId = (String) session.getAttribute("emplId");
			reply.setEmplId(emplId);

			int result = rService.addReReply(reply);
			if (result > 0) {
				return "success";
			} else {
				return "fail";
			}
		}

		// 공지글의 댓글 삭제
		@ResponseBody
		@RequestMapping(value = "/reply/delete.hirp", method = RequestMethod.GET)
		public String removeReply(@RequestParam("replyNo") int replyNo) {
			int result = rService.removeReply(replyNo);
			if (result > 0) {
				return "success";
			} else {
				return "fail";
			}
		}
	
}
