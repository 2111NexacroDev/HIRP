package com.highfive.hirp.alarm.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.domain.AlarmCode;
import com.highfive.hirp.alarm.domain.AlarmSetting;

public interface AlarmStore {

	//알림 설정
	public AlarmSetting selectAlarmSetting(SqlSession sqlSession, String emplId);
	public int insertAlarmSetting(SqlSession sqlSession, String emplId);
	public int updateAlarmSetting(SqlSession sqlSession, AlarmSetting alarmSetting);

	//알림
	public List<Alarm> selectAllAlarm(SqlSession sqlSession, String emplId);
	public List<Alarm> selectUnreadAlarm(SqlSession sqlSession, AlarmSetting alarmSetting);
	public List<Alarm> selectAlarmByCode(SqlSession sqlSession, AlarmCode alarmCode);
	public int insertAlarm(SqlSession sqlSession, Alarm alarm);
	public int updateReadAlarm(SqlSession sqlSession, String emplId);
	public int deleteAllAlarm(SqlSession sqlSession, String emplId);	//알림 전체 삭제
	public int deleteAlarmByNo(SqlSession sqlSession, int alarmNo);  //특정 알림 삭제

}
