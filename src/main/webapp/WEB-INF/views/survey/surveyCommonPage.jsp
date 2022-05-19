<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- survey 공통 layout 페이지 입니다. -->

<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<script src="https://kit.fontawesome.com/08c05a1f0f.js" crossorigin="anonymous"></script> <!-- fontawesome -->
<link rel="stylesheet" href="../../resources/css/survey.css"><!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	<!-- 설문조사 좌측 서브 메뉴 -->
    <div id="conts">
        <aside id="snb">
            <h1 onclick="location.href='/survey/main.hirp'">
                설문조사
            </h1>
            <a class="btn--function" href="/survey/writeInfo.hirp">설문 작성</a>
			
			<!-- common.css에서 #snb>ul.no-icon>li>a:before -->
            <ul class="no-icon">
                <li>
                    <a href="/survey/main.hirp">설문</a>
                    <ul>
                        <li><a href="/survey/proceed.hirp">진행중인 설문</a></li>
                        <li><a href="/survey/closed.hirp">마감된 설문</a></li>
                        <li><a href="/survey/mySurvey.hirp">내가 만든 설문</a></li>
                    </ul>
                </li>
            </ul>
        </aside>
        
</body>
</html>