package com.highfive.hirp.favority.service;

import java.util.List;

import com.highfive.hirp.favority.domain.Favority;

public interface FavorityService {

	public List<Favority> printAll(); // 즐겨찾기 전체 조회
	public int insertFavority(Favority favority); // 즐겨찾기 추가
	public int deleteFavority(int favorityNo); // 즐겨찾기 삭제
}
