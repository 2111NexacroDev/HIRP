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
	public List<Schedule> selectAllCompanySchedule(SqlSession sqlSession) {
		List<Schedule> sList = sqlSession.selectList("ScheduleMapper.selectAllCompanySchedule");
		return sList;
	}

	@Override
	public List<Schedule> selectAllTeamSchedule(SqlSession sqlSession, String loginUser) {
		List<Schedule> sList = sqlSession.selectList("ScheduleMapper.selectAllTeamSchedule", loginUser);
		return sList;
	}

	@Override
	public List<Schedule> selectAllSchedule(SqlSession sqlSession, String loginUser) {
		List<Schedule> sList = sqlSession.selectList("ScheduleMapper.selectAllPersonalSchedule", loginUser);
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
	public int insertScheduleToSub(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.insert("ScheduleMapper.insertScheduleToSub", schedule);
		return result;
	}
	
	@Override
	public int insertCompanySchedule(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.insert("ScheduleMapper.insertCompanySchedule", schedule);
		return result;
	}
	
	@Override
	public int updateSchedule(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.update("ScheduleMapper.modifySchedule", schedule);
		return result;
	}
	
	@Override
	public int updateCompanySchedule(SqlSession sqlSession, Schedule schedule) {
		int result = sqlSession.update("ScheduleMapper.modifyCompanySchedule", schedule);
		return result;
	}

	@Override
	public int deleteSchedule(SqlSession sqlSession, int scheduleNo) {
		int result = sqlSession.delete("ScheduleMapper.deleteSchedule", scheduleNo);
		return result;
	}

	@Override
	public int deleteCompanySchedule(SqlSession sqlSession, int scheduleNo) {
		int result = sqlSession.delete("ScheduleMapper.deleteCompanySchedule", scheduleNo);
		return result;
	}
}
