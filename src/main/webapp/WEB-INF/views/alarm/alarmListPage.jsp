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
			<ul>
                <li>
                    <a href="/alarm/allAlarm.hirp">전체 알림</a>
                </li>
                <li>
                    <a href="/alarm/printAlarm00.hirp">메일</a>
                </li>
                <li>
                    <a href="">게시판</a>
                    <ul>       
                        <li><a href="#">공지게시판</a></li>
                        <li><a href="#">자유게시판</a></li>
                        <li><a href="#">익명게시판</a></li>
                        <li><a href="#">부서게시판</a></li>
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
                    <a href="">전자결재</a>
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
        	<c:if test="${path eq '/alarm/allAlarm.hirp'}" >
        		<h1 class="basic-border-bottom">전체 알림</h1>
        	</c:if>
        	<c:if test="${fn:substring(path, 17, 19) eq '00'}" >
        		<h1 class="basic-border-bottom">메일</h1>
        	</c:if>
        	<c:if test="${fn:substring(path, 17, 19) eq '20'}" >
        		<h1 class="basic-border-bottom">전사 일정</h1>
        	</c:if>
        	<c:if test="${fn:substring(path, 17, 19) eq '21'}" >
        		<h1 class="basic-border-bottom">부서 일정</h1>
        	</c:if>
        	<c:if test="${fn:substring(path, 17, 19) eq '22'}" >
        		<h1 class="basic-border-bottom">개인 일정</h1>
        	</c:if>
        	<c:if test="${fn:substring(path, 17, 19) eq '40'}" >
        		<h1 class="basic-border-bottom">설문조사</h1>
        	</c:if>
<%--         	<c:if test="${fn:substring(path, 17, 19) eq '1%'}" > --%>
<!--         		<h1 class="basic-border-bottom">게시판</h1> -->
<%--         	</c:if> --%>
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts padding-0">
            	<!-- 오늘 날짜 -->
	            <jsp:useBean id="now" class="java.util.Date" />
<%-- 	            <fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss" var="today" /> --%>
				<fmt:formatDate value="${now}" pattern="yyyy-MM-dd" var="today" /> <!-- 오늘 날짜 -->
				<fmt:formatDate value="${now}" pattern="HH:mm:ss" var="time" /> <!-- 현재 시간 -->
				
	        	<div id="alarmList" class="">
	        		<c:forEach items="${alarmList }" var="alarm" varStatus="status">
		        		<!-- 알림 한 묶음 시작 -->
		        		<div class="alarm-row mt-10 basic-border-bottom padding-bottom-10">
						    <div class="alarm-row mt-10  padding-bottom-10" onclick="">
							    <div class="mr-20 ml-20" style="width:30px;">
								    <button class="btn--profile" type="button">
								    	<c:if test="${alarm.emplProfile eq null}">
									        <img src="../resources/images/img_no_profile.png" alt="profile">
					      		    	</c:if>
					      		    	<c:if test="${alarm.emplProfile ne null}">
									        <img src="../resources/uploadFiles/${alarm.emplProfile }" alt="profile">
					      		    	</c:if>
				      		    	</button>
							    </div>
			            	</div>
						    <div>
					        	${alarm.alarmContents }
					        	<div class="mt-10">
						        	<span class="mr-10 colorGrey">
					        			<!-- 오늘 -->
						        		<c:if test="${fn:substring(alarm.alarmDate, 0, 10) eq today}">
						        			${ fn:substring(time, 0, 2) - fn:substring(alarm.alarmDate, 11, 13) }시간 전
						        		</c:if>
						        		<!-- 오늘 아님 -->
						        		<c:if test="${fn:substring(alarm.alarmDate, 0, 10) ne today}">
						        			${fn:substring(alarm.alarmDate, 5, 10)} ${fn:substring(alarm.alarmDate, 11, 13)}:${fn:substring(alarm.alarmDate, 14, 16)}
						        		</c:if>
						        	</span>
						        	<span class="colorGrey">${alarm.emplName }</span>
					        	</div>
				        	</div>
				        	<div style="position:absolute; right:20px;">
					        	<button type="button" class="noneBackground" ><i class="fa-solid fa-xmark"></i></button>
				        	</div>
		            	</div>
		            	<!-- 알림 한 묶음 끝 -->
	        		</c:forEach>
	        		
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
</body>
</html>