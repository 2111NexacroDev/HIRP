package com.highfive.hirp.alram.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.alram.domain.Alram;
import com.highfive.hirp.alram.domain.AlramCode;
import com.highfive.hirp.alram.domain.AlramSetting;

public interface AlramStore {

	//알림 설정
	public AlramSetting selectAlramSetting(SqlSession sqlSession, String emplId);
	public int insertAlramSetting(SqlSession sqlSession, String emplId);
	public int updateAlramSetting(SqlSession sqlSession, AlramSetting alramSetting);

	//알림
	public List<Alram> selectAllAlram(SqlSession sqlSession, String emplId);
	public List<Alram> selectUnreadAlram(SqlSession sqlSession, AlramSetting alramSetting);
	public List<Alram> selectAlramByCode(SqlSession sqlSession, AlramCode alramCode);
	public int insertAlram(SqlSession sqlSession, Alram alram);
	public int updateReadAlram(SqlSession sqlSession, String emplId);
	public int deleteAllAlram(SqlSession sqlSession, String emplId);	//알림 전체 삭제
	public int deleteAlramByNo(SqlSession sqlSession, String alramNo);  //특정 알림 삭제

}
