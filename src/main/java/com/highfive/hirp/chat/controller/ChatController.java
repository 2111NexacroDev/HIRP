package com.highfive.hirp.chat.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.service.ChatService;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.survey.domain.SurveyAnswer;

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
	public ModelAndView insertChattingRoomPage(ModelAndView mv
			,@ModelAttribute Employee employee) {
		return mv;
	}
	//채팅방 추가
	public ModelAndView insertChattingRoom(ModelAndView mv
			,@ModelAttribute ChatRoom chatroom
			,@RequestParam("joinList") List<String> joinList) {
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
	public ModelAndView chattingRoomPage(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo) {
		//채팅방 정보, 채팅 내역 다 가져오기
		return mv;
	}
	//채팅 전송 (첨부파일 가능)
	public ModelAndView sendChat(ModelAndView mv
			,@ModelAttribute Message Message
			,@RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			,HttpServletRequest request) {
		return mv;
	}
	//첨부파일 저장 메소드는 common에서 가져다 쓰기
	
	//첨부파일 다운로드 리턴타입 (수업 때는 jsp에서 함)
//	public ModelAndView fileDownload(ModelAndView mv) {
//		return mv;
//	}
	
	//채팅방별 첨부파일 모두 보기
	public ModelAndView myChattingRoomFile(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo) {
		return mv;
	}
	//내가 받은 첨부파일 모두 보기 //아이디 세션에서 가져오면 될 듯
	public ModelAndView allMyFile(ModelAndView mv) {
		return mv;
	}
	//채팅방 이름 변경
	public ModelAndView chattingRoomRename(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo) {
		return mv;
	}
	//채팅 대화상대 초대
	public ModelAndView chattingAddJoin(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo
			,@RequestParam("joinList") List<String> joinList) {
		return mv;
	}
	//채팅방 나가기
	public ModelAndView chattingRoomLeave(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo) {
		//아이디 세션에서 가져와서 두 개 담아서 chatRoomJoin으로 넘겨주기
		return mv;
	}
	//채팅방 삭제 (본인이 만든 채팅방인 경우만)
	public ModelAndView chattingRoomDelete(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo) {
		
		//본인이 만든 채팅방일 때만 해당 버튼 누를 수 있도록 처리 해놓기
		//채팅방 번호가 걸려있는 모든 채팅 데이터 삭제
		return mv;
	}
}
