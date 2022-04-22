package com.highfive.hirp.favority.service.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.favority.domain.Favority;
import com.highfive.hirp.favority.service.FavorityService;
import com.highfive.hirp.favority.store.FavorityStore;

@Service
public class FavorityServiceImpl implements FavorityService{

	@Autowired
	private FavorityStore fStore;
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public int insertFavority(Favority favority) {
		int result = fStore.insertFavority(sqlSession, favority);
		return result;
	}
	
	@Override
	public int deleteFavority(Favority favority) {
		int result = fStore.deleteFavority(sqlSession, favority);
		return result;
	}
	
	
}
