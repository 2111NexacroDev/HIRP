package com.highfive.hirp.chat.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.omg.CORBA.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.service.ChatService;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.survey.domain.SurveyAnswer;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService cService;
	
	@Autowired
	private EmployeeAdminService eaService;
	
	// 채팅방 입장 테스트
	@RequestMapping(value = "chat.hirp", method = RequestMethod.GET)
	public String view_chat(Model model
			, HttpServletRequest request
			, HttpServletResponse response) throws Exception {

		return "chat/chatTestPage";
	}
		
	//채팅 메인페이지 (직원 목록)
	@RequestMapping(value="chatMain.hirp", method=RequestMethod.GET)
	public ModelAndView chatEmplList(ModelAndView mv) {
		try {
			List<Employee> emplList = eaService.printAllEmployeeWithName();
				
			if(!emplList.isEmpty()){
				mv.addObject("emplList", emplList);
				System.out.println(emplList);
				mv.setViewName("chat/chatMainPage");
			} else {
				mv.addObject("msg", "직원 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
			
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}
	
	//직원 이름으로 검색
	public ModelAndView chatEmplSearch(ModelAndView mv) {
		return mv;
	}
	//채팅방 추가 페이지
	public ModelAndView insertChattingRoomPage(ModelAndView mv
			,@ModelAttribute Employee employee) {
		//직원 리스트 출력
		//직원 이름으로 검색
		//위에 컨트롤러 사용하면 될 듯
		//채팅방 추가 페이지 조회
		
		return mv;
	}
	//채팅방 추가
	public ModelAndView insertChattingRoom(ModelAndView mv
			,@ModelAttribute ChatRoom chatroom
			,@RequestParam("joinList") List<String> joinList) {
		//채팅방 정보 추가
		//채팅방 참가자 리스트 추가
		
		return mv;
	}
	
	//알림 설정(세션 이용하면 되지 않을까)
	public ModelAndView chatAlramStatus(ModelAndView mv) {
		return mv;
	}
	
	//채팅방 목록 페이지
	@RequestMapping(value = "chatroomList.hirp", method = RequestMethod.GET)
	public ModelAndView chattingRoomList(ModelAndView mv
			, HttpServletRequest request ) {
		//내가 참여한 채팅방 목록 가져오기
		//채팅방 별로 채팅, 첨부파일 내용 같이 가져오기
		//마지막 채팅 내용 표시????
		//내용 있으면 텍스트로 출력하고, 마지막 채팅이 사진이면 사진이라고 표기하고 싶음
		
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		try {
			List<ChatRoom> chatroomList = cService.selectMyChattingRoom(emplId);
			mv.addObject("chatroomList", chatroomList);
			mv.setViewName("chat/chatRoomPage");
			//list null체크 jsp에서 해주기 (채팅 목록 없어도 조회는 되어야 하니까)
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//채팅방 내부 페이지
	public ModelAndView chattingRoomPage(ModelAndView mv
			,@RequestParam("chatRoom") ChatRoom chatRoom) {
		//채팅방 목록 페이지에서 chatroom 정보 가져오기
		
		//채팅방 별로 채팅, 첨부파일 내용 같이 가져오기
		//조인해서 같이 가져와야 할 듯 (chatList 도메인 만들었음)
		return mv;
	}
	//채팅 전송 (첨부파일 가능)
	public ModelAndView sendChat(ModelAndView mv
			,@ModelAttribute Message Message
			,@RequestParam(value="uploadFile", required=false) MultipartFile uploadFile
			,HttpServletRequest request) {
		//채팅 추가
		//첨부파일 추가
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
		//이것도 첨부파일, 채팅 조인해서 채팅 정보 (시간, 보낸 사람 등) 같이 갖고오면 될 듯
		//채팅방별로 채팅, 첨부파일 내용 같이 가져오기
		//첨부파일 있는 거만 가져오면 될 듯
		
		
		return mv;
	}
	//내가 받은 첨부파일 모두 보기
	public ModelAndView allMyFile(ModelAndView mv) {
		 //아이디 세션에서 가져오기
		//내가 받은 첨부파일 리스트 가져오기
		//이것도 chatList로 반환, 첨부파일 있는 것만 가져오면 됨.
		//조인....? 서브쿼리....?
		
		return mv;
	}
	//채팅방 이름 변경
	public ModelAndView chattingRoomRename(ModelAndView mv
			,@RequestParam("ChatRoom") ChatRoom chatRoom) {
		//채팅방 정보 넘겨 받아서 채팅방 이름 변경 (정보 update)
		
		return mv;
	}
	//채팅 대화상대 초대
	public ModelAndView chattingAddJoin(ModelAndView mv
			,@RequestParam("chatroomNo") int chatroomNo
			,@RequestParam("joinList") List<String> joinList) {
		//채팅 대화상대 추가
		//list로 받아서 대화상대를 다수 추가하면 for문으로 insert 해주기
		
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
		
		//JSP에서 본인이 만든 채팅방일 때만 해당 버튼 누를 수 있도록 처리 해놓기
		//채팅방 번호가 걸려있는 모든 채팅 데이터 삭제
		//CHATROOM_TBL만 지우면 나머지도 같이 사라지게 REFERENCES 처리 했음.
		return mv;
	}
}
