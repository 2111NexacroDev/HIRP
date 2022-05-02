<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<body>
	<!-- survey 공통 -->
	<%@ include file="/WEB-INF/views/survey/surveyCommonPage.jsp" %>
        
        <!-- 우측 메인 -->
        <article id="sub" class="">
        	<!-- 메인 상단 -->
        	<!-- 우측 상단 바로가기 메뉴 -->
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<!-- 검색폼 필요한 사람 쓰기, class 변경 안하고 id만 부여해서 사용하면 됨 -->
            <form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">내가 만든 설문</h1>
            <!-- 메인 상단 끝 -->
	   		
	   		<!-- 페이지 내용 -->
	   		<div id="" class="subConts">
				<table class="table--basic">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상태</th>
                            <th>설문 제목</th>
                            <th>설문 기간</th>
                            <th>참여율</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        	<td>3</td>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<button class="ongoing" type="button">진행중</button>
								<!-- <button class="finished" type="button">마감</button> -->
                            </td>
                            <td>설문제목1</td>
                            <td>2022-04-11~2022-04-12</td>
                            <td>0/77(0.00%)</td>
                        </tr>
                        <tr>
                        	<td>2</td>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<button class="ongoing" type="button">진행중</button>
								<!-- <button class="finished" type="button">마감</button> -->
                            </td>
                            <td>긴~~~~~~~~~ 설문 제목~~~~~~~~~</td>
                            <td>2022-05-01~2022-05-12</td>
                            <td>3/4(75.00%)</td>
                        </tr>
                        <tr>
                        	<td>1</td>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<!-- <button class="ongoing" type="button">진행중</button> -->
								<button class="finished" type="button">마감</button>
                            </td>
                            <td>설문제목3</td>
                            <td>2022-04-11~2022-04-12</td>
                            <td>1/26(3.85%)</td>
                        </tr>
                    </tbody>
                </table>
	   		 </div>
	   		 <!-- 페이지 내용 끝 -->         
        </article>
</body>
</html>