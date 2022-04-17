package com.highfive.hirp.schedule.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.schedule.service.ScheduleService;
import com.highfive.hirp.schedule.store.ScheduleStore;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ScheduleStore sStore;
}
