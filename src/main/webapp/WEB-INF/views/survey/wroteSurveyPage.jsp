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
                    	<c:if test="${fn:length(sList) == 0}">
                    		<tr>
                    			<td colspan="5" align="center">
                    				내가 작성한 설문조사가 없습니다.
                    			</td>
                    		</tr>
                    	</c:if>
                    	<c:if test="${fn:length(sList) > 0}">
	                    	<!-- 위에서부터 1~로 번호 출력하기 -->
	<%--                   		<c:set var="row_num" value="0"/> --%>
	                    	<!-- 오래된 글부터 1~로 번호 출력하기 -->
	                    	<c:set var="row_num" value="${fn:length(sList)+1 }"/>
	                    	<c:forEach items="${sList }" var="survey" varStatus="status">
	<%--                     	    <c:set var="row_num" value="${row_num+1 }"/> --%>
								<c:set var="row_num" value="${row_num-1 }"/>
								<!-- 진행 중이고, 참여하지 않았을 때 -->
								<c:if test="${survey.surveyStatus eq 'C' && survey.subAnswerstatus eq 'N'}">
									<c:url var="sDetail" value="/survey/questDetail.hirp">
										<c:param name="surveyNo" value="${survey.surveyNo}"></c:param>
									</c:url>
	                           	</c:if>
	                           	<!-- 진행 중이고, 참여했을 때 -->
								<c:if test="${survey.surveyStatus eq 'C' && survey.subAnswerstatus eq 'Y'}">
		                    		<c:url var="sDetail" value="/survey/updateAnswerPage.hirp">
										<c:param name="surveyNo" value="${survey.surveyNo}"></c:param>
									</c:url>
								</c:if>
								<!-- 마감 되었을 때 -->
	                           	<c:if test="${survey.surveyStatus eq 'F'}">
		                           	<c:url var="sDetail" value="/survey/surveyResult.hirp">
										<c:param name="surveyNo" value="${survey.surveyNo}"></c:param>
									</c:url>
	                           	</c:if>
	                    		<tr>
		                        	<td><c:out value="${row_num }"/> </td>
		                            <td>
		                            	<!-- 버튼은 둘 중 하나만 출력 -->
		                            	<c:if test="${survey.surveyStatus eq 'C'}">
		                            		<button class="ongoing" type="button" style="cursor:default;">진행중</button>
		                            	</c:if>
		                            	<c:if test="${survey.surveyStatus eq 'F'}">
		                            		<button class="finished" type="button" style="cursor:default;">마감</button>
		                            	</c:if>
		                            </td>
		                            <td style="cursor:pointer;" onclick="openDetail(this, ${survey.surveyNo}, '${survey.subAnswerstatus }', '${survey.surveyStatus }')">${survey.surveyTitle }</td>
<%-- 		                            <td><a href="${sDetail}">${survey.surveyTitle }</a></td> --%>
		                            <td>${fn:substring(survey.surveyStartdate, 0, 10) } ~ ${fn:substring(survey.surveyEnddate, 0, 10) }</td>
		                            <td>${answerSubCountList[status.count-1] }/${subAllCountList[status.count-1]}(<fmt:formatNumber type="percent" value="${answerSubCountList[status.count-1]/subAllCountList[status.count-1] }" pattern="0.00%" />)</td>
		                        </tr>
	                    	</c:forEach>
	                    	
                    	</c:if>
                    </tbody>
                </table>
	   		 </div>
	   		 <!-- 페이지 내용 끝 -->         
        </article>
	<script>
		//응답 대상자 아닐 때/응답 했을 때/응답 안했을 때 나눠서 detail 조회
	    function openDetail(alertWindow, sNo, sMyAnswerStatus, surveyStatus) {
	    	//ajax로 list 가져오기
	    	$.ajax({
	    		url: "/survey/subList.hirp",
	    		type: "post",
	    		data: {"surveyNo" : sNo},
	    		success: function(sList){
	    			console.log(sList);
	    			var count = sList.length;
					for(var i = 0 ; i < count; i++){
						if(surveyStatus == "F"){
							location.href="/survey/surveyResult.hirp?surveyNo="+sNo;
							break;
						} else {
							if(sList[i].subId == "${sessionScope.emplId}"){
								if(sMyAnswerStatus == "Y"){
									//응답했을 때
									location.href="/survey/updateAnswerPage.hirp?surveyNo="+sNo;
									break;
								} else {
									//응답하지 않았을 때
									location.href="/survey/questDetail.hirp?surveyNo="+sNo;
									break;
								}
							} else {
								if(i == count-1){
									//응답 대상자가 아닐 때 (마지막 인덱스까지 검사)
									location.href="/survey/surveyResult.hirp?surveyNo="+sNo;
								}
							}
						}
					}
	    		},
	    		error: function(){
	    			
	    		}
	    	});
	        
	    }
	</script>
</body>
</html>