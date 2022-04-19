package com.highfive.hirp.favority.store.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.favority.store.FavorityStore;

@Repository
public class FavorityStoreLogic implements FavorityStore{

	@Override
	public int insertFavority(SqlSession sqlSession) {
		int result = sqlSession.insert("");
		return result;
	}

	@Override
	public int deleteFavority(SqlSession sqlSession) {
		int result = sqlSession.delete("");
		return result;
	}

}
