<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/alarm.css">
<script src="https://kit.fontawesome.com/08c05a1f0f.js" crossorigin="anonymous"></script> <!-- fontawesome -->

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <div id="conts">
		<aside id="snb">
			<h1>알림</h1>
<!-- 			<ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">전체 알림</a> -->
<!-- 	            </li> -->
<!--             </ul> -->
<!--             <ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">메일</a> -->
<!-- 	            </li> -->
<!--             </ul> -->
<!--             <ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">게시판</a> -->
<!-- 	                 <ul> -->
<!--                         <li><a href="#">공지게시판</a></li> -->
<!--                         <li><a href="#">자유게시판</a></li> -->
<!--                         <li><a href="#">익명게시판</a></li> -->
<!--                         <li><a href="#">부서게시판</a></li> -->
<!--                     </ul> -->
<!-- 	            </li> -->
<!--             </ul> -->
<!--             <ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">일정관리</a> -->
<!-- 	            </li> -->
<!--             </ul> -->
<!--             <ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">전자결재</a> -->
<!-- 	            </li> -->
<!--             </ul> -->
<!--             <ul class="no-icon"> -->
<!-- 				<li> -->
<!-- 	                <a href="#">설문조사</a> -->
<!-- 	            </li> -->
<!--             </ul> -->
			<!-- 접는 버전 -->
			<ul class="no-icon">
                <li>
                    <a href="/alarm/allAlarm.hirp">전체 알림</a>
                </li>
                <li>
                    <a href="/alarm/printAlarm00.hirp">메일</a>
                </li>
                <li>
                    <a href="">게시판</a>
                    <ul>
                        <li><a href="/alarm/printAlarm10.hirp">공지게시판</a></li>
                        <li><a href="/alarm/printAlarm11.hirp">자유게시판</a></li>
                        <li><a href="/alarm/printAlarm12.hirp">익명게시판</a></li>
                        <li><a href="/alarm/printAlarm13.hirp">부서게시판</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">일정관리</a>
                    <ul>       
                        <li><a href="/alarm/printAlarm20.hirp">전사 일정</a></li>
                        <li><a href="/alarm/printAlarm21.hirp">부서 일정</a></li>
                        <li><a href="/alarm/printAlarm22.hirp">개인 일정</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/alarm/printAlarm30.hirp">전자결재</a>
                </li>
                <li>
                    <a href="/alarm/printAlarm40.hirp">설문조사</a>
                </li>
            </ul>
        </aside>
        <article id="sub">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	<c:set var="path" value="${requestScope['javax.servlet.forward.servlet_path']}"/>
<%--         	<c:out value="${path}" /> --%>
			<h1 class="basic-border-bottom">
	        	<c:if test="${path eq '/alarm/allAlarm.hirp'}" >
	        		전체 알림
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '00'}" >
	        		메일
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '10'}" >
	        		공지게시판
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '11'}" >
	        		자유게시판
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '12'}" >
	        		익명게시판
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '13'}" >
	        		부서게시판
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '20'}" >
	        		전사 일정
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '21'}" >
	        		부서 일정
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '22'}" >
	        		개인 일정
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '30'}" >
	        		전자결재
	        	</c:if>
	        	<c:if test="${fn:substring(path, 17, 19) eq '40'}" >
	        		설문조사
	        	</c:if>
	        	&nbsp;&nbsp;&nbsp;<button type="button" onclick="location.href='/alarm/deleteAllAlarm.hirp?${sessionScope.emplId}'"><i class="fa-solid fa-xmark"></i> 전체 삭제</button>
        	</h1>
        	
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts padding-0">
            	<!-- 오늘 날짜 -->
	            <jsp:useBean id="now" class="java.util.Date" />
<%-- 	            <fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss" var="today" /> --%>
				<fmt:formatDate value="${now}" pattern="yyyy-MM-dd" var="today" /> <!-- 오늘 날짜 -->
				<fmt:formatDate value="${now}" pattern="HH:mm:ss" var="time" /> <!-- 현재 시간 -->
				
	        	<div id="alarmList" class="">
	        		<c:if test="${fn:length(alarmList) eq 0 }">
	        			<div class="basic-border-bottom padding-20 t-c">
	        				등록된 알림이 없습니다.
	        			</div>
	        		</c:if>
	        		<c:if test="${fn:length(alarmList) ne 0 }">
		        		<c:forEach items="${alarmList }" var="alarm" varStatus="status">
			        		<!-- 알림 한 묶음 시작 -->
			        		<div class="alarm-row mt-10 basic-border-bottom padding-bottom-10" >
							    <button class="btn--profile mr-20 ml-20" type="button">
							    	<c:if test="${alarm.emplProfile eq null}">
								        <img src="../resources/images/img_no_profile.png" alt="profile">
				      		    	</c:if>
				      		    	<c:if test="${alarm.emplProfile ne null}">
								        <img src="../resources/uploadFiles/${alarm.emplProfile }" alt="profile">
				      		    	</c:if>
			      		    	</button>
							    <div>
						        	<div onclick="alarmClickEvent('${alarm.alarmCode}');">${alarm.alarmContents }</div>
						        	<div class="mt-10">
							        	<span class="mr-10 colorGrey">
						        			<!-- 오늘 -->
							        		<c:if test="${fn:substring(alarm.alarmDate, 0, 10) eq today}">
							        			<c:if test="${ (fn:substring(time, 0, 2) - fn:substring(alarm.alarmDate, 11, 13)) eq 0}">
							        				방금 전
							        			</c:if>
							        			<c:if test="${ (fn:substring(time, 0, 2) - fn:substring(alarm.alarmDate, 11, 13)) ne 0}">
								        			${ fn:substring(time, 0, 2) - fn:substring(alarm.alarmDate, 11, 13) }시간 전
							        			</c:if>
							        		</c:if>
							        		<!-- 오늘 아님 -->
							        		<c:if test="${fn:substring(alarm.alarmDate, 0, 10) ne today}">
							        			${fn:substring(alarm.alarmDate, 5, 10)} ${fn:substring(alarm.alarmDate, 11, 13)}:${fn:substring(alarm.alarmDate, 14, 16)}
							        		</c:if>
							        	</span>
							        	<span class="colorGrey">${alarm.deptName } ${alarm.emplName } ${alarm.positionName }</span>
						        	</div>
					        	</div>
					        	<div style="position:absolute; right:20px;">
						        	<button type="button" class="noneBackground" onclick="deleteAlarmByNo(this, ${alarm.alarmNo});" ><i class="fa-solid fa-xmark"></i></button>
					        	</div>
			            	</div>
			            	<!-- 알림 한 묶음 끝 -->
		        		</c:forEach>
	        		
	        		</c:if>
	        		
<!-- 	            	알림 한 묶음 시작 -->
<!-- 	            	<div class="alarm-row mt-10 basic-border-bottom padding-bottom-10"> -->
<!-- 					    <div class="alarm-row mt-10  padding-bottom-10" onclick=""> -->
<!-- 						    <div class="mr-20 ml-20" style="width:30px;"> -->
<!-- 				      		    <button class="btn--profile" type="button"> -->
<!-- 								        <img src="../resources/images/img_no_profile.png" alt="profile"> -->
<%-- 										        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile"> --%>
<!-- 							    </button> -->
<!-- 						    </div> -->
<!-- 		            	</div> -->
<!-- 					    <div> -->
<!-- 				        	[일정 알림] '권진실 과장 생일' 일정 알림입니다. -->
<!-- 				        	<div class="mt-10"> -->
<!-- 					        	<span class="mr-10 colorGrey">3시간 전</span> -->
<!-- 					        	<span class="colorGrey">관리자</span> -->
<!-- 				        	</div> -->
<!-- 			        	</div> -->
<!-- 			        	<div style="position:absolute; right:20px;"> -->
<!-- 				        	<button type="button" class="noneBackground" ><i class="fa-solid fa-xmark"></i></button> -->
<!-- 			        	</div> -->
<!-- 	            	</div> -->
<!-- 	            	알림 한 묶음 끝 -->
		    	</div>
	    	</div>
        </article>
	</div>
	<script>
	
		//알림 선택해서 삭제
		function deleteAlarmByNo(obj, alarmNo){
			console.log($(obj).parent().parent()); //알림 묶음 찾음
			
			$.ajax({
				url:"/alarm/deleteAlarmByNo.hirp",
				type:"post",
				data:{"alarmNo" : alarmNo},
				success: function(data){
					alert("성공");
					$(obj).parent().parent().remove(); //알림 묶음 지우기
				},
				error: function(){
					alert("실패");
				}
			});
		}
		
		//알림 클릭 시 이동
		function alarmClickEvent(alarmCode){
	    	console.log(alarmCode+" 클릭");
	    	if(alarmCode == '00'){ //메일
	    		location.href = "/mail/Rlist.hirp";
	    	} else if(alarmCode == '10'){ //공지
	    		location.href = "/notice/list.hirp";
	    	} else if(alarmCode == '11'){ //자유
	    		location.href = "/free/list.hirp";
	    	} else if(alarmCode == '12'){ //익명
	    		location.href = "/anonymous/list.hirp";
	    	} else if(alarmCode == '13'){ //부서
	    		location.href = "/department/list.hirp";
	    	} else if(alarmCode == '20' || alarmCode == '21' || alarmCode == '22'){ //전사, 부서, 개인
	    		location.href = "/schedule/list.hirp";
	    	} else if(alarmCode == '30' || alarmCode == '31' || alarmCode == '32' || alarmCode == '33'){ 
	    		//결재 도착, 취소, 반려, 완료
	    		location.href = "/approval/main.hirp";
	    	} else if(alarmCode == '40'){
	    		location.href = "/survey/main.hirp";
	    	} else {
	    		console.log("알림 코드가 없습니다.");
	    	}
	    }
	
	</script>
</body>
</html>