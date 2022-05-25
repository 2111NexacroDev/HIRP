package com.highfive.hirp.time.admin.service.logic;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.group.store.GroupStore;
import com.highfive.hirp.time.admin.domain.TimeAdmin;
import com.highfive.hirp.time.admin.service.TimeAdminService;
import com.highfive.hirp.time.admin.store.TimeAdminStore;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;

@Service
public class TimeAdminServiceImpl implements TimeAdminService {

	@Autowired
	private SqlSession sqlSession; // 얘때문에 (sqlSession)가능
	
	@Autowired
	private TimeAdminStore taStore;

	// 관리자 출퇴근 내역 조회
	@Override
	public List<Time> inOutTimeView() {
		List<Time> time = taStore.selectInOutTimeView(sqlSession);
		return time;
	}

	// 관리자 연차 신청 내역 조회
	@Override
	public List<Vacation> vacationView() {
		List<Vacation> vacation = taStore.selectVacationView(sqlSession);
		return vacation;
	}

	// 관리자 근태 조정 신청 내역 조회
	@Override
	public List<TimeModify> timeModifyView() {
		List<TimeModify> timeModify = taStore.selectTimeModifyView(sqlSession);
		return timeModify;
	}
}