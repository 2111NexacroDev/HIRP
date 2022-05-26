package com.highfive.hirp.chat.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.service.ChatService;

@Component
public class HandlerChat extends TextWebSocketHandler {

	@Autowired
	private ChatService cService;
	
	// (<"chatroomNo", 방ID>, <"session", 세션>) - (<"chatroomNo", 방ID>, <"session", 세션>) - (<"chatroomNo", 방ID>, <"session", 세션>) 형태 
		private List<Map<String, Object>> sessionList = new ArrayList<Map<String, Object>>();
		
		// 클라이언트가 서버로 메세지 전송 처리
		@Override
		protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
			
			//로그인할 때 저장했던 세션값 가져옴.
			Map<String, Object> loginSession = session.getAttributes();
			String emplId = (String)loginSession.get("emplId");
			System.out.println("로그인한 아이디 : " + emplId);
			
			super.handleTextMessage(session, message);
	        
			// JSON --> Map으로 변환
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> mapReceive = objectMapper.readValue(message.getPayload(), Map.class);

			switch (mapReceive.get("cmd")) {
			
			// CLIENT 입장
			case "CMD_ENTER":
				// 세션 리스트에 저장
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("chatroomNo", mapReceive.get("chatroomNo"));
				map.put("session", session);
				sessionList.add(map);
				
				// 같은 채팅방에 입장 메세지 전송
				for (int i = 0; i < sessionList.size(); i++) {
					Map<String, Object> mapSessionList = sessionList.get(i);
					String chatroomNo = (String) mapSessionList.get("chatroomNo");
					WebSocketSession sess = (WebSocketSession) mapSessionList.get("session");
					
					if(chatroomNo.equals(mapReceive.get("chatroomNo"))) {
						Map<String, String> mapToSend = new HashMap<String, String>();
						mapToSend.put("chatroomNo", chatroomNo);
						mapToSend.put("cmd", "CMD_ENTER");
						mapToSend.put("emplId", emplId);
						mapToSend.put("msg", "님이 입장 했습니다.");
						
						String jsonStr = objectMapper.writeValueAsString(mapToSend);
						sess.sendMessage(new TextMessage(jsonStr));
					}
				}
				break;
				
			// CLIENT 메세지
			case "CMD_MSG_SEND":
				// 같은 채팅방에 메세지 전송
				for (int i = 0; i < sessionList.size(); i++) {
					Map<String, Object> mapSessionList = sessionList.get(i);
					String chatroomNo = (String) mapSessionList.get("chatroomNo");
					WebSocketSession sess = (WebSocketSession) mapSessionList.get("session");

					//채팅방에 메세지 출력
					if (chatroomNo.equals(mapReceive.get("chatroomNo"))) {
						Map<String, String> mapToSend = new HashMap<String, String>();
						mapToSend.put("chatroomNo", chatroomNo);
						mapToSend.put("cmd", "CMD_MSG_SEND");
						mapToSend.put("emplId", emplId);
						mapToSend.put("msg", mapReceive.get("msg"));
						String jsonStr = objectMapper.writeValueAsString(mapToSend);
						sess.sendMessage(new TextMessage(jsonStr));
					}
					
				}
				
				//메세지 db에 저장
				Message messageVo = new Message();
				messageVo.setChatroomNo(Integer.parseInt(mapReceive.get("chatroomNo")));
				messageVo.setMsgSendid(emplId);
				messageVo.setMsgContents(mapReceive.get("msg"));
				int result = cService.insertMessage(messageVo);
				if(result > 0 ) { //DB에 추가 성공
					System.out.println(emplId + " : "+ mapReceive.get("msg")+"메세지 추가");
				}
				
				break;
			}
		}

		// 클라이언트가 연결을 끊음 처리
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

			super.afterConnectionClosed(session, status);
	        
			ObjectMapper objectMapper = new ObjectMapper();
			String now_chatroomNo = "";
			
			//로그인할 때 저장했던 세션값 가져옴.
			Map<String, Object> loginSession = session.getAttributes();
			String emplId = (String)loginSession.get("emplId");
			System.out.println("로그인한 아이디 : " + emplId);
			
			// 사용자 세션을 리스트에서 제거
			for (int i = 0; i < sessionList.size(); i++) {
				Map<String, Object> map = sessionList.get(i);
				String chatroomNo = (String) map.get("chatroomNo");
				WebSocketSession sess = (WebSocketSession) map.get("session");
				
				if(session.equals(sess)) {
					now_chatroomNo = chatroomNo;
					sessionList.remove(map);
					break;
				}	
			}
			
			// 같은 채팅방에 퇴장 메세지 전송 
			for (int i = 0; i < sessionList.size(); i++) {
				Map<String, Object> mapSessionList = sessionList.get(i);
				String chatroomNo = (String) mapSessionList.get("chatroomNo");
				WebSocketSession sess = (WebSocketSession) mapSessionList.get("session");

				if (chatroomNo.equals(now_chatroomNo)) {
					Map<String, String> mapToSend = new HashMap<String, String>();
					mapToSend.put("chatroomNo", chatroomNo);
					mapToSend.put("cmd", "CMD_EXIT");
					mapToSend.put("emplId", emplId);
					mapToSend.put("msg", "님이 퇴장 했습니다.");

					String jsonStr = objectMapper.writeValueAsString(mapToSend);
					sess.sendMessage(new TextMessage(jsonStr));
				}
			}
		}
	
//	private List<WebSocketSession> sessionList = new ArrayList<WebSocketSession>();
//		
//	// 클라이언트가 서버로 연결 처리
//	@Override
//	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//		
//		//로그인할 때 저장했던 세션값 가져옴.
//		Map<String, Object> loginSession = session.getAttributes();
//		String emplId = (String)loginSession.get("emplId");
//		System.out.println("로그인한 아이디 : " + emplId);
//				
//		// 채팅방에 접속한 사용자 세션을 리스트에 저장
//		sessionList.add(session);
//
//		// 모든 세션에 채팅 전달
//		for (int i = 0; i < sessionList.size(); i++) {
//			WebSocketSession s = sessionList.get(i);
//			s.sendMessage(new TextMessage(emplId + "님이 입장 했습니다."));
//		}
//	}
//
//	// 클라이언트가 서버로 메세지 전송 처리
//	@Override
//	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//				
//		//로그인할 때 저장했던 세션값 가져옴.
//		Map<String, Object> loginSession = session.getAttributes();
//		String emplId = (String)loginSession.get("emplId");
//		System.out.println("로그인한 아이디 : " + emplId);
//		
//		// 모든 세션에 채팅 전달
//		for (int i = 0; i < sessionList.size(); i++) {
//			WebSocketSession s = sessionList.get(i);
//			s.sendMessage(new TextMessage(emplId + " : " + message.getPayload()));
//		}
//	}
//
//	// 클라이언트가 연결을 끊음 처리
//	@Override
//	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//		//로그인할 때 저장했던 세션값 가져옴.
//		Map<String, Object> loginSession = session.getAttributes();
//		String emplId = (String)loginSession.get("emplId");
//		System.out.println("로그인한 아이디 : " + emplId);
//		
//		// 채팅방에서 퇴장한 사용자 세션을 리스트에서 제거
//		sessionList.remove(session);
//
//		// 모든 세션에 채팅 전달
//		for (int i = 0; i < sessionList.size(); i++) {
//			WebSocketSession s = sessionList.get(i);
//			s.sendMessage(new TextMessage(emplId + "님이 퇴장 했습니다."));
//		}
//
//	}
//	
	
}