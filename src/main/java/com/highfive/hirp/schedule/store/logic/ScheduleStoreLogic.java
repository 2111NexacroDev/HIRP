package com.highfive.hirp.schedule.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.store.ScheduleStore;

@Repository
public class ScheduleStoreLogic implements ScheduleStore {

	@Override
	public List<Schedule> selectAllSchedule(SqlSession sqlSession) {
		List<Schedule> sList = sqlSession.selectList("ScheduleMapper.selectAllSchedule");
		return sList;
	}
	
	@Override
	public List<Schedule> selectSearchSchedule(SqlSession sqlSession, Search search) {
		List<Schedule> searchList = sqlSession.selectList("ScheduleMapper.selectSearchSchedule", search);
		return searchList;
	}

	@Override
	public int insertSchedule(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.insert("ScheduleMapper.insertSchedule", schedule);
		return result;
	}

	@Override
	public int updateSchedule(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.update("ScheduleMapper.modifySchedule", schedule);
		return result;
	}

	@Override
	public int deleteSchedule(SqlSession sqlSession, int scheduleNo) {
		int result = sqlSession.delete("ScheduleMapper.deleteSchedule", scheduleNo);
		return result;
	}
}
