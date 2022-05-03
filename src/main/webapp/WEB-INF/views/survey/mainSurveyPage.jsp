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

            <h1 class="basic-border-bottom">설문 홈</h1>
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts">
            	<!--  진행중인 설문 중 내가 대상자이면서, 아직 참여하지 않은 설문 -->
            	<div class="row">
            		<!-- 박스, 갯수 추가하면 됨. -->
	            	<div class="col-4 basic-border bor-round padding-0">
	            		<div class="padding-20">
		            		<!-- 버튼은 둘 중 하나만 출력 -->
							<button class="emergency" type="button">미참여</button>
							<button class="finished" type="button">참여완료</button>	
							<h2 class="mt-10">설문 제목</h2>
							<p class="mt-10 color-grey">2022-04-11~2022-04-12</p>
							<div class="row mt-10">
		                        <div class="col-4">
									<p class="color-grey">작성자</p>
									<!-- display inline-block으로 바꾸면 자기 사이즈만큼만 차지 -->
		                        </div>
		                        <div class="">
		                            <p class="">민봉식 대표이사</p>
		                        </div>
		                    </div>
		                    <div class="row mt-10">
		                        <div class="col-4">
									<div>
		                            	<p class="color-grey">설문 결과</p>
		                            </div>
		                        </div>
		                        <div class="">
		                            <div>
		                            	<p class="">공개</p>
		                            </div>
		                        </div>
		                    </div>
	            		</div>
	                	
	                	<div class="t-c padding-20 basic-border-top">
	                		<a href="#">설문 참여</a>
	                	</div>
	                </div>
	                <!-- 박스 끝 -->
            	</div>
            	<!--  진행중인 설문 중 내가 대상자이면서, 아직 참여하지 않은 설문 끝 -->
            
            
            <br><br><br>
            <h2>최근 생성된 설문</h2>
            	<table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>상태</th>
                            <th>설문 제목</th>
                            <th>설문 기간</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<button class="emergency" type="button">미참여</button>
								<!-- <button class="finished" type="button">참여완료</button> -->
                            </td>
                            <td>설문제목1</td>
                            <td>2022-04-11~2022-04-12</td>
                            <td>민봉식 대표이사</td>
                        </tr>
                        <tr>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<button class="emergency" type="button">미참여</button>
								<!-- <button class="finished" type="button">참여완료</button> -->	
                            </td>
                            <td>긴~~~~~~~~~ 설문 제목~~~~~~~~~</td>
                            <td>2022-05-01~2022-05-12</td>
                            <td>이융경 부장</td>
                        </tr>
                        <tr>
                            <td>
                            	<!-- 버튼은 둘 중 하나만 출력 -->
								<!-- <button class="emergency" type="button">미참여</button> -->
								<button class="finished" type="button">참여완료</button>	
                            </td>
                            <td>설문제목3</td>
                            <td>2022-04-11~2022-04-12</td>
                            <td>권진실 과장</td>
                        </tr>

                    </tbody>
                </table>
            
            </div>
            <!-- 페이지 내용 끝 -->
            
            
        </article>
</body>
</html>