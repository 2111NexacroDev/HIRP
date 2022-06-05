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
                    <a href="">전체 알림</a>
                </li>
                <li>
                    <a href="">메일</a>
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
                        <li><a href="#">전사일정</a></li>
                        <li><a href="#">팀일정</a></li>
                        <li><a href="#">내일정</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">전자결재</a>
                </li>
                <li>
                    <a href="">설문조사</a>
                </li>
            </ul>
        </aside>
        <article id="sub">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	<h1 class="basic-border-bottom">설문 홈</h1>
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts padding-0">
	        	<div id="alarmList" class="">
	        		<!-- 알림 한 묶음 시작 -->
	        		<div class="alarm-row mt-10 basic-border-bottom padding-bottom-10">
					    <div class="alarm-row mt-10  padding-bottom-10" onclick="">
						    <div class="mr-20 ml-20" style="width:30px;">
				      		    <button class="btn--profile" type="button">
								        <img src="../resources/images/img_no_profile.png" alt="profile">
<%-- 										        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile"> --%>
							    </button>
						    </div>
		            	</div>
					    <div>
				        	[일정 알림] '권진실 과장 생일' 일정 알림입니다.
				        	<div class="mt-10">
					        	<span class="mr-10 colorGrey">3시간 전</span>
					        	<span class="colorGrey">관리자</span>
				        	</div>
			        	</div>
			        	<div style="position:absolute; right:20px;">
				        	<button type="button" class="noneBackground" ><i class="fa-solid fa-xmark"></i></button>
			        	</div>
	            	</div>
	            	<!-- 알림 한 묶음 끝 -->
	            	<!-- 알림 한 묶음 시작 -->
	            	<div class="alarm-row mt-10 basic-border-bottom padding-bottom-10">
					    <div class="alarm-row mt-10  padding-bottom-10" onclick="">
						    <div class="mr-20 ml-20" style="width:30px;">
				      		    <button class="btn--profile" type="button">
								        <img src="../resources/images/img_no_profile.png" alt="profile">
<%-- 										        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile"> --%>
							    </button>
						    </div>
		            	</div>
					    <div>
				        	[일정 알림] '권진실 과장 생일' 일정 알림입니다.
				        	<div class="mt-10">
					        	<span class="mr-10 colorGrey">3시간 전</span>
					        	<span class="colorGrey">관리자</span>
				        	</div>
			        	</div>
			        	<div style="position:absolute; right:20px;">
				        	<button type="button" class="noneBackground" ><i class="fa-solid fa-xmark"></i></button>
			        	</div>
	            	</div>
	            	<!-- 알림 한 묶음 끝 -->
		    	</div>
	    	</div>
        </article>
	</div>
</body>
</html>