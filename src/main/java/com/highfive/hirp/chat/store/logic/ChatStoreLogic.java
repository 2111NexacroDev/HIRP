package com.highfive.hirp.chat.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.chat.domain.ChatFile;
import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.ChatRoomJoin;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.store.ChatStore;
import com.highfive.hirp.employee.domain.Employee;

@Repository
public class ChatStoreLogic implements ChatStore{

	//직원 목록 가져오기
	@Override
	public List<Employee> selectEmployeeList(SqlSession sqlSession) {
		List<Employee> emplList = sqlSession.selectList("ChatMapper.selectEmployeeList");
		return emplList;
	}
	//직원 이름으로 검색해서 직원 목록 가져오기
	@Override
	public List<Employee> selectEmployeeListByName(SqlSession sqlSession, String name) {
		List<Employee> emplList = sqlSession.selectList("ChatMapper.selectEmployeeListByName", name);
		return emplList;
	}
	//채팅방 추가 (대화 상대, 채팅방 이름 설정)
	@Override
	public int insertChattingRoom(SqlSession sqlSession, ChatRoom chatRoom) {
		int result = sqlSession.insert("ChatMapper.insertChattingRoom", chatRoom);
		return result;
	}
	@Override
	public int insertChatRoomJoin(SqlSession sqlSession, List<String> emplIdList) {
		int result = sqlSession.insert("ChatMapper.insertChatRoomJoin", emplIdList);
		return result;
	}
	
	//채팅방 목록 가져오기
	//내가 참여한 채팅방 번호 목록 가져오기
	@Override
	public List<Integer> selectMyChattingRoomNum(SqlSession sqlSession, String emplId) {
		List<Integer> chatNoList = sqlSession.selectList("ChatMapper.selectMyChattingRoomNum", emplId);
		return chatNoList;
	}
	//채팅방 번호로 채팅방 목록 가져오기
	@Override
	public List<ChatRoom> selectMyChattingRoomList(SqlSession sqlSession, int chatroomNo) {
		List<ChatRoom> chatroomList = sqlSession.selectList("ChatMapper.selectMyChattingRoomList", chatroomNo);
		return chatroomList;
	}
	//채팅방 별로 채팅 내용 가져오기
	@Override
	public List<Message> selectMessageByRoomNo(SqlSession sqlSession, int chatroomNo) {
		List<Message> messageList = sqlSession.selectList("ChatMapper.selectMessageByRoomNo", chatroomNo);
		return messageList;
	}
	//보내진 첨부파일 가져오기
	@Override
	public ChatFile selectChatFileByMsgNo(SqlSession sqlSession, int msgNo) {
		ChatFile chatFile = sqlSession.selectOne("ChatMapper.selectMessageByRoomNo", msgNo);
		return chatFile;
	}

	//채팅 추가
	@Override
	public int insertMessage(SqlSession sqlSession, Message msg) {
		int result = sqlSession.insert("ChatMapper.insertMessage", msg);
		return result;
	}
	//첨부파일 추가
	@Override
	public int insertChatFile(SqlSession sqlSession, ChatFile chatfile) {
		int result = sqlSession.insert("ChatMapper.insertChatFile", chatfile);
		return result;
	}

	//채팅방별 첨부파일 리스트 가져오기
	@Override
	public List<ChatFile> selectChatFileByChattingRoomNo(SqlSession sqlSession, int chatroomNo) {
		List<ChatFile> chatfileList = sqlSession.selectList("ChatMapper.selectChatFileByChattingRoomNo", chatroomNo);
		return chatfileList;
	}
	//내가 받은 첨부파일 리스트 가져오기
	@Override
	public List<ChatFile> selectChatFileById(SqlSession sqlSession, String emplId) {
		List<ChatFile> chatFileList = sqlSession.selectList("ChatMapper.selectChatFileById", emplId);
		return chatFileList;
	}
	//채팅방 정보 변경(이름 변경)
	@Override
	public int updateChatRoomInfo(SqlSession sqlSession, ChatRoom chatRoom) {
		int result = sqlSession.update("ChatMapper.updateChatRoomInfo", chatRoom);
		return result;
	}

	//채팅 대화상대 추가
	@Override
	public int insertChatRoomJoinOnly(SqlSession sqlSession, ChatRoomJoin chatRoomJoin) {
		int result = sqlSession.insert("ChatMapper.insertChatRoomJoinOnly", chatRoomJoin);
		return result;
	}
	//채팅방 나가기
	@Override
	public int deleteMyIdChatRoomJoin(SqlSession sqlSession, ChatRoomJoin chatRoomJoin) {
		int result = sqlSession.delete("ChatMapper.deleteMyIdChatRoomJoin", chatRoomJoin);
		return result;
	}
	//채팅방 삭제
	@Override
	public int deleteChatRoom(SqlSession sqlSession, ChatRoom chatRoom) {
		int result = sqlSession.delete("ChatMapper.deleteChatRoom", chatRoom);
		return result;
	}

}
