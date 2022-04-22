package com.highfive.hirp.board.common;

public class BoardRecommend {

	private int recommendNo;
	private String emplId;
	private String boardType;
	private int boardNo;
	private String isRecommend;
	
	public BoardRecommend() {}
	
	public BoardRecommend(int recommendNo, String emplId, String boardType, int boardNo, String isRecommend) {
		super();
		this.recommendNo = recommendNo;
		this.emplId = emplId;
		this.boardType = boardType;
		this.boardNo = boardNo;
		this.isRecommend = isRecommend;
	}
	public int getRecommendNo() {
		return recommendNo;
	}
	public void setRecommendNo(int recommendNo) {
		this.recommendNo = recommendNo;
	}
	public String getEmplId() {
		return emplId;
	}
	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}
	public String getBoardType() {
		return boardType;
	}
	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getIsRecommend() {
		return isRecommend;
	}
	public void setIsRecommend(String isRecommend) {
		this.isRecommend = isRecommend;
	}
	@Override
	public String toString() {
		return "BoardRecommend [recommendNo=" + recommendNo + ", emplId=" + emplId + ", boardType=" + boardType
				+ ", boardNo=" + boardNo + ", isRecommend=" + isRecommend + "]";
	}
	
	
}
