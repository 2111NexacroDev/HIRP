package com.highfive.hirp.chat.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.chat.domain.ChatFile;
import com.highfive.hirp.chat.domain.ChatList;
import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.ChatRoomJoin;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.service.ChatService;
import com.highfive.hirp.chat.store.ChatStore;
import com.highfive.hirp.employee.domain.Employee;

@Service
public class ChatServiceImpl implements ChatService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ChatStore cStore;

	//직원 목록 가져오기
	@Override
	public List<Employee> selectEmployeeList() {
		List<Employee> empList = cStore.selectEmployeeList(sqlSession);
		return empList;
	}

	//직원 이름으로 검색해서 직원 목록 가져오기
	@Override
	public List<Employee> selectEmployeeListByName(String name) {
		List<Employee> empList = cStore.selectEmployeeListByName(sqlSession, name);
		return empList;
	}
	
	//채팅방 추가(대화 상대, 채팅방 이름 설정)
	@Override
	public int insertChattingRoom(ChatRoom chatRoom) {
		int result = cStore.insertChattingRoom(sqlSession, chatRoom);
		return result;
	}

	@Override
	public int insertChatRoomJoin(List<String> emplIdList) {
		int result = cStore.insertChatRoomJoin(sqlSession, emplIdList);
		return result;
	}
	
	//채팅방 목록 가져오기
	//내가 참여한 채팅방 목록 가져오기
	@Override
	public List<ChatRoom> selectMyChattingRoom(String emplId) {
		List<ChatRoom> roomList = cStore.selectMyChattingRoom(sqlSession, emplId);
		return roomList;
	}
	//채팅방 별로 채팅 내용 가져오기
	@Override
	public List<Message> selectMessageByRoomNo(int chatroomNo) {
		List<Message> messageList = cStore.selectMessageByRoomNo(sqlSession, chatroomNo);
		return messageList;
	}
	//보내진 첨부파일 가져오기
	@Override
	public ChatFile selectChatFileByMsgNo(int msgNo) {
		ChatFile chatFile = cStore.selectChatFileByMsgNo(sqlSession, msgNo);
		return chatFile;
	}
	//채팅방 별로 채팅, 첨부파일 내용 같이 가져오기
	@Override
	public List<ChatList> selectChatListByRoomNo(int chatroomNo) {
		List<ChatList> chatList = cStore.selectChatListByRoomNo(sqlSession, chatroomNo);
		return chatList;
	}

	//채팅 추가
	@Override
	public int insertMessage(Message msg) {
		int result = cStore.insertMessage(sqlSession, msg);
		return result;
	}
	//첨부파일 추가
	@Override
	public int insertChatFile(ChatFile chatfile) {
		int result = cStore.insertChatFile(sqlSession, chatfile);
		return result;
	}

	//채팅방별 첨부파일 리스트 가져오기
	@Override
	public List<ChatList> selectChatFileListByChatRoomNo(int chatroomNo) {
		List<ChatList> chatList = cStore.selectChatFileListByChatRoomNo(sqlSession, chatroomNo);
		return chatList;
	}
	//내가 받은 첨부파일 리스트 가져오기
	@Override
	public List<ChatList> selectChatFileListById(String emplId) {
		List<ChatList> chatList = cStore.selectChatFileListById(sqlSession, emplId);
		return chatList;
	}
	//채팅방 정보 변경 (이름 변경)
	@Override
	public int updateChatRoomInfo(ChatRoom chatRoom) {
		int result = cStore.updateChatRoomInfo(sqlSession, chatRoom);
		return result;
	}
	//채팅 대화상대 추가
	@Override
	public int insertChatRoomJoinOnly(ChatRoomJoin chatRoomJoin) {
		int result = cStore.insertChatRoomJoinOnly(sqlSession, chatRoomJoin);
		return result;
	}
	//채팅방 나가기(채팅 대화상대에서 삭제)
	@Override
	public int deleteMyIdChatRoomJoin(ChatRoomJoin chatRoomJoin) {
		int result = cStore.deleteMyIdChatRoomJoin(sqlSession, chatRoomJoin);
		return result;
	}
	//채팅방 삭제
	@Override
	public int deleteChatRoom(int chatroomNo) {
		int result = cStore.deleteChatRoom(sqlSession, chatroomNo);
		return result;
	}



}
