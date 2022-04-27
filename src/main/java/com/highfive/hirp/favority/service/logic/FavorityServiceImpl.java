package com.highfive.hirp.favority.service.logic;

import java.util.List;

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
	public List<Favority> printAll() {
		List<Favority> fList = fStore.selectAllFavority(sqlSession);
		return fList;
	}
	
	@Override
	public int insertFavority(Favority favority) {
		int result = fStore.insertFavority(sqlSession, favority);
		return result;
	}
	
	@Override
	public int deleteFavority(int favorityNo) {
		int result = fStore.deleteFavority(sqlSession, favorityNo);
		return result;
	}
	
}
