package com.highfive.hirp.favority.store;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.favority.domain.Favority;

public interface FavorityStore {

	int insertFavority(SqlSession sqlSession, Favority favority);
	int deleteFavority(SqlSession sqlSession, Favority favority);

}
