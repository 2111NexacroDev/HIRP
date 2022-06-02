package com.highfive.hirp.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.ChatRoomJoin;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.domain.PersonalId;
import com.highfive.hirp.chat.service.ChatService;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.survey.domain.SurveyAnswer;
import com.highfive.hirp.survey.domain.SurveySub;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService cService;
	
	@Autowired
	private EmployeeAdminService eaService;
	
	//채팅 메인페이지 (직원 목록)
	@RequestMapping(value="/chatMain.hirp", method=RequestMethod.GET)
	public ModelAndView chatEmplList(ModelAndView mv
			, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		try {
			List<Employee> emplList = eaService.printAllEmployeeWithName();
				
			if(!emplList.isEmpty()){
				mv.addObject("emplList", emplList);
//				System.out.println(emplList);
				for(int i = 0; i < emplList.size(); i++) {
					if(emplList.get(i).getEmplId().equals(emplId) ) {
						System.out.println("나의 정보"+emplList.get(i));
					}
				}
				System.out.println("채팅방 열기");
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
	
	//직원 이름으로 검색 -> adminempl쪽에 공통으로 만듬.

	//그룹 채팅방 추가
	@RequestMapping(value="/chat/addChatroom.hirp", method=RequestMethod.GET)
	public ModelAndView insertChattingRoom(ModelAndView mv
			,@ModelAttribute ChatRoom chatroom
			,@ModelAttribute ChatRoomJoin chatroomJoin
			, HttpServletRequest request) {
		
		//userId
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		try {
			//채팅방 정보 추가
			chatroom.setChatroomManager(emplId); //채팅방 생성자 추가
			chatroom.setChatroomType("G");
			System.out.println(chatroom);
			System.out.println(chatroomJoin);
			//채팅방 생성 후 chatroomNo return 
			int chatroomNo = cService.insertChattingRoom(chatroom);
			System.out.println("chatroomNo : " + chatroomNo);
			
			//나 자신도 추가
			chatroomJoin.getChatRoomJoinList().add(new ChatRoomJoin(0, chatroomNo, emplId));
			for(int i = 0; i < chatroomJoin.getChatRoomJoinList().size(); i++) {
				chatroomJoin.getChatRoomJoinList().get(i).setChatroomNo(chatroomNo);
				//채팅방 참가자 리스트 추가
				int result = cService.insertChatRoomJoin(chatroomJoin.getChatRoomJoinList().get(i));
				if(result > 0 ) {
					System.out.println("채팅방 참가자 추가 " + i+1);
				}
			}
//			mv.setViewName("redirect:/chatroomList.hirp");
			//chatroomNo 넘겨줘서 새창 열게 함.
			mv.setViewName("redirect:/chatroomList.hirp?chatroomNo="+chatroomNo);
//			mv.setViewName("redirect:/chat.hirp?chatroomNo="+chatroomNo); //새창으로 띄울 방법은 없을까?
			
		} catch (Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		
		return mv;
	}
	
	//개인 채팅방 추가
	@ResponseBody
	@RequestMapping(value="/chat/addPersonChatroom.hirp", method=RequestMethod.POST)
	public String insertPersonChattingRoom(ModelAndView mv
			,@RequestParam("joinchatId") String joinchatId
			, HttpServletRequest request) {
		
		//userId
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		System.out.println(joinchatId);
		
		//이미 만들어진 채팅방이 있는지 확인
		PersonalId idList = new PersonalId(emplId, joinchatId);
		ChatRoom chatRoom = cService.selectMyPersonalChattingRoom(idList);
		System.out.println(chatRoom);
		
		if(chatRoom != null) {
			return Integer.toString(chatRoom.getChatroomNo());
		} else {
			//이미 만들어진 채팅방이 없을 때
			//채팅방 정보 추가
			ChatRoom newChatroom = new ChatRoom();
			newChatroom.setChatroomManager(emplId);
			newChatroom.setChatroomName("personalChatting");
			newChatroom.setChatroomType("P");
			
			System.out.println(newChatroom);
			
			//채팅방 생성 후 chatroomNo return 
			int chatroomNo = cService.insertChattingRoom(newChatroom);
			System.out.println("chatroomNo : " + chatroomNo);
			
			//채팅방 참가자 추가
			ChatRoomJoin chatroomJoin1 = new ChatRoomJoin(0, chatroomNo, emplId); //나 자신
			ChatRoomJoin chatroomJoin2 = new ChatRoomJoin(0, chatroomNo, joinchatId); //상대
			
			int result = cService.insertChatRoomJoin(chatroomJoin1);
			int result2 = cService.insertChatRoomJoin(chatroomJoin2);
			
			if(result > 0 || result2 > 0) {
				System.out.println("개인 채팅방 참가자 추가");
				System.out.println(chatroomJoin1);
				System.out.println(chatroomJoin2);
				return Integer.toString(chatroomNo);
			}
		}
		
		return "";
	}
	
	//알림 설정(세션 이용하면 되지 않을까)
	public ModelAndView chatAlramStatus(ModelAndView mv) {
		return mv;
	}
	
	//채팅방 목록 페이지
	@RequestMapping(value = "/chatroomList.hirp", method = RequestMethod.GET)
	public ModelAndView chattingRoomList(ModelAndView mv
			, HttpServletRequest request 
			,@RequestParam(value="chatroomNo", required=false) Integer chatroomNo) {
		//내가 참여한 채팅방 목록 가져오기
		//채팅방 별로 채팅, 첨부파일 내용 같이 가져오기
		//마지막 채팅 내용 표시????
		//내용 있으면 텍스트로 출력하고, 마지막 채팅이 사진이면 사진이라고 표기하고 싶음
		
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		try {
			List<ChatRoom> chatroomList = cService.selectMyChattingRoom(emplId);
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			
			if(!emplList.isEmpty()){
				mv.addObject("emplList", emplList);
			} else {
				mv.addObject("msg", "직원 리스트 조회 실패");
				mv.setViewName("common/errorPage");
			}
			
			//채팅방을 추가했을 경우 chatroomNo를 넘겨준다.
			if(chatroomNo != null) {
				mv.addObject("chatroomNo", chatroomNo);
			}
			
			mv.addObject("chatroomList", chatroomList);
			mv.setViewName("chat/chatRoomPage");
			//list null체크 jsp에서 해주기 (채팅 목록 없어도 조회는 되어야 하니까)
		} catch(Exception e) {
			mv.addObject("msg", e.toString());
			mv.setViewName("common/errorPage");
		}
		return mv;
	}
	
	//채팅방 이름, 채팅 참여자 이름 검색
	@ResponseBody
	@RequestMapping(value="/searchChatroomList.hirp", method=RequestMethod.POST, produces="application/json;charset=utf-8")
	public String searchEmplList(
			Model model
			,@RequestParam("chatroomSearchKeyword") String chatroomSearchKeyword
			, HttpServletRequest request ){
		System.out.println("채팅방 검색" + chatroomSearchKeyword); //값 잘 넘어옴

		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		//파라미터로 넘겨줄 map
		Map<String, String> searchMap = new HashMap<>();
		searchMap.put("emplId", emplId);
		searchMap.put("chatroomSearchKeyword", chatroomSearchKeyword);
		
		List<ChatRoom> chatroomList = cService.selectMyChattingRoom(searchMap);
		model.addAttribute("chatroomList", chatroomList);
		System.out.println(chatroomList);
		if(!chatroomList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(chatroomList);
		}
		return "";
	}
	
	// 채팅방 내부 페이지
	@RequestMapping(value = "/chat.hirp", method = RequestMethod.GET)
	public String chattingRoomPage(Model model
			, HttpServletRequest request
			, HttpServletResponse response
			, @RequestParam("chatroomNo") int chatroomNo) throws Exception {
		
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		try {
			//파라미터로 넘겨줄 map
			Map<String, String> searchMap = new HashMap<>();
			searchMap.put("chatroomNo", Integer.toString(chatroomNo));
			searchMap.put("emplId", emplId);
			
			ChatRoom chatroom = cService.selectChatRoomInfoByNo(searchMap);
//			model.addAttribute("chatroomNo", chatroomNo);
			model.addAttribute("chatroom", chatroom);
			System.out.println(chatroom);

			if(chatroom.getChatroomType().equals("G")) {
				List<ChatRoomJoin> chatRoomJoinList = cService.selectChatRoomJoinListByNo(chatroomNo);
				if(chatRoomJoinList != null) {
					model.addAttribute("chatRoomJoinList", chatRoomJoinList);
					System.out.println(chatRoomJoinList);
				} else {
					System.out.println("참가자가 없어요!");
				}
			}
			return "chat/chattingPage";
			
		} catch(Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
	}
	
	//채팅 내용 조회
	@ResponseBody
	@RequestMapping(value="/chat/printMessage.hirp", method=RequestMethod.POST, produces="application/json;charset=utf-8")
	public String proceedSurveySubList(
			@RequestParam("chatroomNo") int chatroomNo){
		//응답자 리스트 보기 (응답여부까지) -> 팝업창
		List<Message> msgList = cService.selectMessageByRoomNo(chatroomNo);
		if(!msgList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(msgList);
		}
		return "";
	}
	
	// 채팅 정보 조회
	@RequestMapping(value = "/chatInfo.hirp", method = RequestMethod.GET)
	public String chatInfo(Model model
			, HttpServletRequest request
			, HttpServletResponse response
			,@RequestParam("chatroomNo") int chatroomNo
//			,@ModelAttribute ChatRoom chatroom
//			,@ModelAttribute ChatRoomJoin chatroomJoin
			) throws Exception {

		System.out.println("채팅방 정보 조회");
		System.out.println(chatroomNo);
		
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		try {
			//파라미터로 넘겨줄 map
			Map<String, String> searchMap = new HashMap<>();
			searchMap.put("chatroomNo", Integer.toString(chatroomNo));
			searchMap.put("emplId", emplId);
			
			ChatRoom chatroom = cService.selectChatRoomInfoByNo(searchMap);
//			model.addAttribute("chatroomNo", chatroomNo);
			model.addAttribute("chatroom", chatroom);
			System.out.println(chatroom);
			
			//직원 리스트
			List<Employee> emplList = eaService.printAllEmployeeWithName();
			model.addAttribute("emplList", emplList);
			
			if(chatroom.getChatroomType().equals("G")) {
				List<ChatRoomJoin> chatRoomJoinList = cService.selectChatRoomJoinListByNo(chatroomNo);
				if(chatRoomJoinList != null) {
					model.addAttribute("chatRoomJoinList", chatRoomJoinList);
					System.out.println(chatRoomJoinList);
				} else {
					System.out.println("참가자가 없어요!");
				}
			}
			return "chat/chatInfoPage";
			
		} catch(Exception e) {
			model.addAttribute("msg", e.toString());
			return "common/errorPage";
		}
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
	@ResponseBody
	@RequestMapping(value="/updateChatroom.hirp", method=RequestMethod.POST)
	public String chattingRoomRename(
			@ModelAttribute("ChatRoom") ChatRoom chatRoom) {
		//채팅방 정보 넘겨 받아서 채팅방 이름 변경 (정보 update)
		int result = cService.updateChatRoomInfo(chatRoom);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	//채팅 대화상대 초대
	@ResponseBody
	@RequestMapping(value="/addChatroomJoin.hirp", method=RequestMethod.POST)
	public String chattingAddJoin(ModelAndView mv
			, HttpServletRequest request
			,@RequestParam("joinchatIdList[]") List<String> joinchatIdList
			,@RequestParam("chatroomNo") int chatroomNo) {
		//채팅 대화상대 추가
		//list로 받아서 대화상대를 다수 추가하면 for문으로 insert 해주기
		//userId
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		System.out.println("chatroomNo : " + chatroomNo);
		int result = 0;
		//채팅방 참가자 리스트 추가
		for(int i = 0; i < joinchatIdList.size(); i++) {
			ChatRoomJoin chatroomJoin = new ChatRoomJoin(0, chatroomNo, joinchatIdList.get(i));
			result += cService.insertChatRoomJoin(chatroomJoin);
		}
		if(result > 0 ) {
			System.out.println("채팅방 참가자 추가 성공");
			return "success";
		} else {
			return "fail";
		}
			
	}

	//채팅방 나가기
	@ResponseBody
	@RequestMapping(value="/deleteChatRoomJoin.hirp", method=RequestMethod.POST)
	public String chattingRoomLeave(
			HttpServletRequest request
			,@RequestParam("chatroomNo") int chatroomNo) {
		//아이디 세션에서 가져와서 두 개 담아서 chatRoomJoin으로 넘겨주기
		HttpSession session = request.getSession();
		String emplId = session.getAttribute("emplId").toString();
		
		ChatRoomJoin chatroomJoin = new ChatRoomJoin(0, chatroomNo, emplId);
		
		int result = cService.deleteMyIdChatRoomJoin(chatroomJoin);
		if(result > 0) {
			return "success";
		} else {
			return "fail";
		}
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
