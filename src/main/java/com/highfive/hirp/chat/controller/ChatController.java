package com.highfive.hirp.chat.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService cService;
	
	//채팅 메인페이지 (직원 목록)
	public ModelAndView chatEmplList(ModelAndView mv) {
		return mv;
	}
	//직원 이름으로 검색
	public ModelAndView chatEmplSearch(ModelAndView mv) {
		return mv;
	}
	//채팅방 추가 페이지
	public ModelAndView insertChattingRoomPage(ModelAndView mv) {
		return mv;
	}
	//채팅방 추가
	public ModelAndView insertChattingRoom(ModelAndView mv) {
		return mv;
	}
	
	//알림 설정(세션 이용하면 되지 않을까)
	public ModelAndView chatAlramStatus(ModelAndView mv) {
		return mv;
	}
	
	//채팅방 목록 페이지
	public ModelAndView chattingRoomList(ModelAndView mv) {
		return mv;
	}
	//채팅방 내부 페이지
	public ModelAndView chattingRoomPage(ModelAndView mv) {
		return mv;
	}
	//채팅 전송 (첨부파일 가능)
	public ModelAndView sendChat(ModelAndView mv
			,@ModelAttribute Message Message
			,@RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			,HttpServletRequest request) {
		return mv;
	}
	//첨부파일 저장
	public HashMap<String, String> saveFile(MultipartFile file, HttpServletRequest request) {
		String filePath = "";
		HashMap<String, String> fileMap = new HashMap<String, String>();
		
		return fileMap;
	}
	//첨부파일 다운로드 리턴타입 이게 맞나
	public ModelAndView fileDownload(ModelAndView mv) {
		return mv;
	}
	
	//채팅방별 첨부파일 모두 보기
	public ModelAndView myChattingRoomFile(ModelAndView mv) {
		return mv;
	}
	//내가 받은 첨부파일 모두 보기
	public ModelAndView allMyFile(ModelAndView mv) {
		return mv;
	}
	//채팅방 이름 변경
	public ModelAndView chattingRoomRename(ModelAndView mv) {
		return mv;
	}
	//채팅 대화상대 초대
	public ModelAndView chattingAddJoin(ModelAndView mv) {
		return mv;
	}
	//채팅방 나가기
	public ModelAndView chattingRoomLeave(ModelAndView mv) {
		return mv;
	}
	//채팅방 삭제 (본인이 만든 채팅방인 경우만)
	public ModelAndView chattingRoomDelete(ModelAndView mv) {
		return mv;
	}
}
