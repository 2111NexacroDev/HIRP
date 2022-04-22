package com.highfive.hirp.favority.store.logic;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.favority.domain.Favority;
import com.highfive.hirp.favority.store.FavorityStore;

@Repository
public class FavorityStoreLogic implements FavorityStore{

	@Override
	public int insertFavority(SqlSession sqlSession, Favority favority) {
		int result = sqlSession.insert("FavorityMapper.insertFavority", favority);
		return result;
	}

	@Override
	public int deleteFavority(SqlSession sqlSession, int favorityNo) {
		int result = sqlSession.delete("FavorityMapper.deleteFavority", favorityNo);
		return result;
	}

}
