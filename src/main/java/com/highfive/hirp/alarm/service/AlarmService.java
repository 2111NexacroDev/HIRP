package com.highfive.hirp.alarm.service;

import java.util.List;

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.domain.AlarmCode;
import com.highfive.hirp.alarm.domain.AlarmSetting;

public interface AlarmService {

	//알림 설정
	public AlarmSetting selectAlarmSetting(String emplId);
	public int insertAlarmSetting(String emplId);
	public int updateAlarmSetting(AlarmSetting alarmSetting);

	//알림
	public List<Alarm> selectAllAlarm(String emplId); //모든 알림
	public List<Alarm> selectUnreadAlarm(AlarmSetting alarmSetting); //알림 설정된 애들 중에서 안 읽은 알림
	public List<Alarm> selectAlarmByCode(String emplId, String code); //코드별로 알림 가져오기
	public int insertAlarm(Alarm alarm); //알림 추가하기
	public int updateReadAlarm(String emplId); //종 누르먼 전부 읽음으로 update
	public int deleteAllAlarm(String emplId); //전체 알림 삭제하기
	public int deleteAlarmByNo(String alarmNo); //특정 알림 삭제하기
}
