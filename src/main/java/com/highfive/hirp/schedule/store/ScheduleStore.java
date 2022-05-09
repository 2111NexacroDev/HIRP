package com.highfive.hirp.schedule.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;

public interface ScheduleStore {
	public List<Schedule> selectAllSchedule(SqlSession sqlSession);
	public List<Schedule> selectSearchSchedule(SqlSession sqlSession, Search search);
	public int insertSchedule(SqlSession sqlSession, Schedule schedule);
	public int insertScheduleToSub(SqlSession sqlSession, Schedule schedule);
	public int updateSchedule(SqlSession sqlSession, Schedule schedule);
	public int deleteSchedule(SqlSession sqlSession, int scheduleNo);
}
