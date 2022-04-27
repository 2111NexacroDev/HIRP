package com.highfive.hirp.favority.store;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.highfive.hirp.favority.domain.Favority;

public interface FavorityStore {

	List<Favority> selectAllFavority(SqlSession sqlSession);
	int insertFavority(SqlSession sqlSession, Favority favority);
	int deleteFavority(SqlSession sqlSession, int favorityNo);

}
