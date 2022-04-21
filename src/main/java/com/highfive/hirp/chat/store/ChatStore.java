package com.highfive.hirp.chat.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.chat.domain.ChatFile;
import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.ChatRoomJoin;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.employee.domain.Employee;

public interface ChatStore {

	//직원 목록 가져오기
	public List<Employee> selectEmployeeList(SqlSession sqlSession);
	//직원 이름으로 검색해서 직원 목록 가져오기
	public List<Employee> selectEmployeeListByName(SqlSession sqlSession, String name);
	//채팅방 추가 (대화 상대, 채팅방 이름 설정)
	public int insertChattingRoom(SqlSession sqlSession, ChatRoom chatRoom);
	public int insertChatRoomJoin(SqlSession sqlSession, List<String> emplIdList);

	//채팅방 목록 가져오기
	//내가 참여한 채팅방 번호 목록 가져오기
	public List<Integer> selectMyChattingRoomNum(SqlSession sqlSession, String emplId);
	//채팅방 번호로 채팅방 목록 가져오기
	public List<ChatRoom> selectMyChattingRoomList(SqlSession sqlSession, int chatroomNo);
	//채팅방 별로 채팅 내용 가져오기
	public List<Message> selectMessageByRoomNo(SqlSession sqlSession, int chatroomNo);
	//보내진 첨부파일 가져오기
	public ChatFile selectChatFileByMsgNo(SqlSession sqlSession, int msgNo);
	
	//채팅 추가
	public int insertMessage(SqlSession sqlSession, Message msg);
	//첨부파일 추가
	public int insertChatFile(SqlSession sqlSession, ChatFile chatfile);
	
	//채팅방별 첨부파일 리스트 가져오기
	public List<ChatFile> selectChatFileByChattingRoomNo(SqlSession sqlSession, int chatroomNo);
	//내가 받은 첨부파일 리스트 가져오기
	public List<ChatFile> selectChatFileById(SqlSession sqlSession, String emplId);
	//채팅방 정보 변경 (이름 변경)
	public int updateChatRoomInfo(SqlSession sqlSession, ChatRoom chatRoom);
	//채팅 대화상대 추가
	public int insertChatRoomJoinOnly(SqlSession sqlSession, ChatRoomJoin chatRoomJoin);
	//채팅방 나가기 (채팅 대화 상대에서 삭제)
	public int deleteMyIdChatRoomJoin(SqlSession sqlSession, String emplId);
	//채팅방 삭제
	public int deleteChatRoom(SqlSession sqlSession, ChatRoom chatRoom);

}
