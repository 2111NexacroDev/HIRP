<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- survey 공통 layout 페이지 입니다. -->

<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<script src="https://kit.fontawesome.com/08c05a1f0f.js" crossorigin="anonymous"></script> <!-- fontawesome -->

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <div id="conts">
        <aside id="snb">
			<h1>마이페이지</h1>

			<ul class="no-icon">
				<li><a href="/employee/mypageView1.hirp">내 정보 보기</a></li>
				<li><a href="/alarm/settingPage.hirp">알림 설정</a></li>
			</ul>
		</aside>
		<article id="sub">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        </article>
    </div>
</body>
</html>