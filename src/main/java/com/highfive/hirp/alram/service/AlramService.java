package com.highfive.hirp.alram.service;

import java.util.List;

import com.highfive.hirp.alram.domain.Alram;
import com.highfive.hirp.alram.domain.AlramCode;
import com.highfive.hirp.alram.domain.AlramSetting;

public interface AlramService {

	//알림 설정
	public AlramSetting selectAlramSetting(String emplId);
	public int insertAlramSetting(String emplId);
	public int updateAlramSetting(AlramSetting alramSetting);

	//알림
	public List<Alram> selectAllAlram(String emplId); //모든 알림
	public List<Alram> selectUnreadAlram(AlramSetting alramSetting); //알림 설정된 애들 중에서 안 읽은 알림
	public List<Alram> selectAlramByCode(AlramCode alramCode); //코드별로 알림 가져오기
	public int insertAlram(Alram alram); //알림 추가하기
	public int updateReadAlram(String emplId); //종 누르먼 전부 읽음으로 update
	public int deleteAllAlram(String emplId); //전체 알림 삭제하기
	public int deleteAlramByNo(String alramNo); //특정 알림 삭제하기
}
