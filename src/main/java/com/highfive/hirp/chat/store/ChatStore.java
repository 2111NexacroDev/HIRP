package com.highfive.hirp.chat.store;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.chat.domain.ChatFile;
import com.highfive.hirp.chat.domain.ChatList;
import com.highfive.hirp.chat.domain.ChatRoom;
import com.highfive.hirp.chat.domain.ChatRoomJoin;
import com.highfive.hirp.chat.domain.Message;
import com.highfive.hirp.chat.domain.PersonalId;
import com.highfive.hirp.employee.domain.Employee;

public interface ChatStore {

	//직원 목록 가져오기
	//직원 이름으로 검색해서 직원 목록 가져오기
	//채팅방 추가 (대화 상대, 채팅방 이름 설정)
	public int insertChattingRoom(SqlSession sqlSession, ChatRoom chatRoom);
	public int insertChatRoomJoin(SqlSession sqlSession, ChatRoomJoin chatroomJoin);

	//채팅방 목록 가져오기
	//내가 참여한 채팅방 목록 가져오기
	public List<ChatRoom> selectMyChattingRoom(SqlSession sqlSession, String emplId);
	//채팅방 검색 (채팅방 이름, 채팅방 참여자 이름 + 내가 참여한 채팅 중에서)
	public List<ChatRoom> selectMyChattingRoom(SqlSession sqlSession, Map<String, String> searchMap);
	//나와 상대방이 포함된 개인 채팅방 가져오기
	public ChatRoom selectMyPersonalChattingRoom(SqlSession sqlSession, PersonalId idList);
	
	//채팅방 번호, 내 아이디로 정보 가져오기
	public ChatRoom selectChatRoomInfoByNo(SqlSession sqlSession, Map<String, String> searchMap);
	//채팅방 번호로 참여자 정보 가져오기
	public List<ChatRoomJoin> selectChatRoomJoinListByNo(SqlSession sqlSession, int chatroomNo);

	//채팅방 별로 채팅 내용 가져오기
	public List<Message> selectMessageByRoomNo(SqlSession sqlSession, int chatroomNo);
	//보내진 첨부파일 가져오기
	public ChatFile selectChatFileByMsgNo(SqlSession sqlSession, int msgNo);
	//채팅방 별로 채팅, 첨부파일 내용 같이 가져오기
	public List<ChatList> selectChatListByRoomNo(SqlSession sqlSession, int chatroomNo);
	
	//채팅 추가
	public int insertMessage(SqlSession sqlSession, Message msg);
	//첨부파일 추가
	public int insertChatFile(SqlSession sqlSession, ChatFile chatfile);
	
	//채팅방별 첨부파일 리스트 가져오기
//	public List<ChatFile> selectChatFileByChattingRoomNo(SqlSession sqlSession, int chatroomNo);
	public List<ChatList> selectChatFileListByChatRoomNo(SqlSession sqlSession, int chatroomNo);
	//내가 받은 첨부파일 리스트 가져오기
//	public List<ChatFile> selectChatFileById(SqlSession sqlSession, String emplId);
	public List<ChatList> selectChatFileListById(SqlSession sqlSession, String emplId);
	//채팅방 정보 변경 (이름 변경)
	public int updateChatRoomInfo(SqlSession sqlSession, ChatRoom chatRoom);
	//채팅 대화상대 추가
	public int insertChatRoomJoinOnly(SqlSession sqlSession, ChatRoomJoin chatRoomJoin);
	//채팅방 나가기 (채팅 대화 상대에서 삭제)
	public int deleteMyIdChatRoomJoin(SqlSession sqlSession, ChatRoomJoin chatRoomJoin);
	//채팅방 삭제
	public int deleteChatRoom(SqlSession sqlSession, int chatroomNo);

}
