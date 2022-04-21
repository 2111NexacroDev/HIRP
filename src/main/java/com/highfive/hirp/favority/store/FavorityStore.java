package com.highfive.hirp.favority.store;

import org.apache.ibatis.session.SqlSession;

public interface FavorityStore {

	int insertFavority(SqlSession sqlSession);
	int deleteFavority(SqlSession sqlSession);

}
