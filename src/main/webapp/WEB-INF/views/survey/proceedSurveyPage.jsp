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

            <h1 class="basic-border-bottom">진행중인 설문</h1>
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
                            <th>작성자</th>
                            <th>응답자</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<!-- 위에서부터 1~로 번호 출력하기 -->
<!--                     	<c:set var="row_num" value="0"/> -->
                    	<!-- 오래된 글부터 1~로 번호 출력하기 -->
                    	<c:set var="row_num" value="${fn:length(sList)+1 }"/>
                    	<c:forEach items="${sList }" var="survey">
<%--                     		<c:set var="row_num" value="${row_num+1 }"/> --%>
							<c:set var="row_num" value="${row_num-1 }"/>
							<c:url var="sDetail" value="/survey/questDetail.hirp">
								<c:param name="surveyNo" value="${survey.surveyNo}"></c:param>
							</c:url>
							<tr onclick="location.href='${sDetail}'">
	                        	<td><c:out value="${row_num }"/> </td>
	                            <td>
	                            	<!-- 버튼은 둘 중 하나만 출력 -->
	                            	<c:if test="${survey.subAnswerstatus eq 'Y'}">
	                            		<button class="finished" type="button">참여완료</button>
	                            	</c:if>
	                            	<c:if test="${survey.subAnswerstatus eq 'N' || empty survey.subAnswerstatus}">
	                            		<button class="emergency" type="button">미참여</button>
	                            	</c:if>
	                            </td>
	                            <td>${survey.surveyTitle }</td>
	                            <td>${survey.surveyStartdate }~${survey.surveyEnddate }</td>
	                            <td>${survey.surveyWriter }</td>
	                            <td>
	                            	<button class="finished" type="button" onclick="openSubListAlert(this, ${survey.surveyNo});">보기</button>
		                            <!-- 응답자 목록 section -->
		                            <section class="section--alert">
					                    <div class="bg-black">
					                    </div>
					                    <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
					                    <div class="section--alert__survey">
					                    	
					                        <button class="btn--close"></button>
					                        <h1 align="left" class="padding-0">
								                응답 대상자 목록
								            </h1>
					                        <table class="table--basic mt-20" id="subListTbl">
							                    <thead>
							                        <tr>
							                            <th>소속부서</th>
							                            <th>성명</th>
							                            <th style="text-align: center;">참여여부</th>
							                        </tr>
							                    </thead>
							                    <tbody>
							                    	<!-- ajax로 출력 -->
							                        <tr>
							                            <td>개발팀</td>
							                            <td>이민선</td>
							                            <td>X</td>
							                        </tr>
							                        <tr>
							                            <td>개발팀</td>
							                            <td>이융경</td>
							                         	<td>O</td>
							                        </tr>
							                    </tbody>
							                </table>
							                
					                        <div class="btns-wrap mt-20">
					                            <button class="point closeWindow" type="button">확인</button>
					                        </div>
					                    </div>
					                </section>
				                </td>
	                        </tr>
                    	</c:forEach>
<!--                         <tr> -->
<!--                         	<td>3</td> -->
<!--                             <td> -->
<!--                             	버튼은 둘 중 하나만 출력 -->
<!-- 								<button class="emergency" type="button">미참여</button> -->
<!-- 								<button class="finished" type="button">참여완료</button> -->
<!--                             </td> -->
<!--                             <td>설문제목1</td> -->
<!--                             <td>2022-04-11~2022-04-12</td> -->
<!--                             <td>민봉식 대표이사</td> -->
<!--                             <td> -->
<!--                             	<button class="finished" type="button" onclick="openAlert(this);">보기</button> -->
<!-- 	                            응답자 목록 section -->
<!-- 	                            <section class="section--alert"> -->
<!-- 				                    <div class="bg-black"> -->
<!-- 				                    </div> -->
<!-- 				                    검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
<!-- 				                    <div class="section--alert__conts"> -->
<!-- 				                        <button class="btn--close"></button> -->
<!-- 				                        <table class="table--basic mt-20"> -->
<!-- 						                    <thead> -->
<!-- 						                        <tr> -->
<!-- 						                            <th>소속부서</th> -->
<!-- 						                            <th>성명</th> -->
<!-- 						                            <th>참여여부</th> -->
<!-- 						                        </tr> -->
<!-- 						                    </thead> -->
<!-- 						                    <tbody> -->
<!-- 						                        <tr> -->
<!-- 						                            <td>개발팀</td> -->
<!-- 						                            <td>이민선</td> -->
<!-- 						                            <td>X</td> -->
<!-- 						                        </tr> -->
<!-- 						                        <tr> -->
<!-- 						                            <td>개발팀</td> -->
<!-- 						                            <td>이융경</td> -->
<!-- 						                         	<td>O</td> -->
<!-- 						                        </tr> -->
<!-- 						                    </tbody> -->
<!-- 						                </table> -->
						                
<!-- 				                        <div class="btns-wrap mt-20"> -->
<!-- 				                            <button class="point" type="button">확인</button> -->
<!-- 				                            <button class="finished closeWindow" type="button">닫기</button> -->
<!-- 				                        </div> -->
<!-- 				                    </div> -->
<!-- 				                </section> -->
<!-- 			                </td> -->
<!--                         </tr> -->
<!--                         <tr> -->
<!--                         	<td>2</td> -->
<!--                             <td> -->
<!--                             	버튼은 둘 중 하나만 출력 -->
<!-- 								<button class="emergency" type="button">미참여</button> -->
<!-- 								<button class="finished" type="button">참여완료</button> -->
<!--                             </td> -->
<!--                             <td>긴~~~~~~~~~ 설문 제목~~~~~~~~~</td> -->
<!--                             <td>2022-05-01~2022-05-12</td> -->
<!--                             <td>이융경 부장</td> -->
<!--                             <td><button class="finished" type="button">보기</button></td> -->
<!--                         </tr> -->
<!--                         <tr> -->
<!--                         	<td>1</td> -->
<!--                             <td> -->
<!--                             	버튼은 둘 중 하나만 출력 -->
<!-- 								<button class="emergency" type="button">미참여</button> -->
<!-- 								<button class="finished" type="button">참여완료</button> -->
<!--                             </td> -->
<!--                             <td>설문제목3</td> -->
<!--                             <td>2022-04-11~2022-04-12</td> -->
<!--                             <td>권진실 과장</td> -->
<!--                             <td><button class="finished" type="button">보기</button></td> -->
<!--                         </tr> -->
                    </tbody>
                </table>
	   		 </div>
	   		 <!-- 페이지 내용 끝 -->         
        </article>
        <script>
        	//응답자 목록 가져오기
	        function openSubListAlert(alertWindow, sNo) {
	        	//ajax로 list 가져오기
	        	$.ajax({
	        		url: "/survey/subList.hirp",
	        		type: "post",
	        		data: {"surveyNo" : sNo},
	        		success: function(sList){
	        			console.log(sList);
	        			var count = sList.length;
// 	        			console.log(count);
	        			var $tableBody = $("#subListTbl tbody");
	        			$tableBody.html("");//기존 내용 있으면 비우기
// 	        			<tr>
// 	                        <td>개발팀</td>
// 	                        <td>이민선</td>
// 	                        <td>X</td>
// 	                    </tr>
						for(var i=0; i<count; i++){
		        			var $tr = $("<tr>");
		        			var $tdTeam = $("<td style='text-align: left;'>").html(sList[i].deptName);
		        			var $tdName = $("<td style='text-align: left;'>").html(sList[i].emplName+sList[i].positionName);
		        			if(sList[i].subAnswerstatus == 'Y'){
			        			var $tdStatus = $("<td style='text-align: center;'>").html('O');
		        			} else if(sList[i].subAnswerstatus == 'N') {
			        			var $tdStatus = $("<td style='text-align: center;'>").html('X');
		        			}
							$tr.append($tdTeam);
							$tr.append($tdName);
							$tr.append($tdStatus);
// 							console.log("for문" + i);
							$tableBody.append($tr);
						}
	        		},
	        		error: function(){
	        			var $tableBody = $("#subListTbl tbody");
	        			$tableBody.html("");//기존 내용 있으면 비우기
	        			var $tr = $("<tr>");
	        			var $text = $("<td colspan='3' style='text-align: center;'>").html("응답 대상자가 없습니다.");
						$tr.append($text);
						$tableBody.append($tr);
	        		}
	        	});
// 	        	console.log(sNo);
	        	//모달창 띄우기
	            $(alertWindow).siblings('.section--alert').css('display', 'flex');
	            
	        }
        </script>
</body>

</html>