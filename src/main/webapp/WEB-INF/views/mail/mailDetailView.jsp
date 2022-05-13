<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css?after">

<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>
                	메일
            </h1>
            <a class="btn--function" href="/mail/writeView.hirp">메일쓰기</a>

            <ul>
               <li>
                   <a href="">메일함</a>
                   <ul>
                       <li><a href="#">받은메일함</a></li>
                       <li><a href="#">보낸메일함</a></li>
                       <li><a href="#">임시보관함</a></li>
                       <li><a href="#">내게쓴메일함</a></li>
                       <li><a href="#">중요메일함</a></li>
                       <li><a href="#">휴지통</a><button class="basic mt-20" type="button">비우기</button></li>
                   </ul>
               </li>
            </ul>
            
            <a class="btn--function" href="#">버그리포트 작성</a>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>
        	
        	<h1 class="basic-border-bottom">
				받은메일함
            </h1>
            <button class="basic mt-20" type="button">답장</button>
            <button class="basic mt-20" type="button">삭제</button>
            <button class="basic mt-20" type="button">전달</button>
            <!-- 오른쪽으로 밀어야 함 -->
            <button class="basic mt-20"><a href="/mail/list.hirp">목록</a></button>
            
            <div class="subConts">
	            <form action="/mail/detail.hirp" method="get">
	            	<table class="table--basic mt-20">
	            		<tr>
	            			<!-- 즐겨찾기 버튼 넣어야함 -->
	            			<td></td>
	            			<td>${mail.mailTitle }</td>
	            		</tr>
	            		<tr>
	            			<td>보낸사람:</td>
	            			<td>${mail.mailSender }</td>
	            		</tr>
	            		<tr>
	            			<td>받는사람:</td>
	            			<td>${mail.recipientId }</td>
	            		</tr>
	            		<tr>
	            			<td>보낸날짜:</td>
	            			<td>${mail.mailDate }</td>
	            		</tr>
	            		<tr>
	            			<td>${mail.fileName }</td>
	            		</tr>
	            		<tr>
	            			<td>${mail.mailContents }</td>
	            		</tr>
	            	</table>
	            </form>
            </div>
		</article>
	</div>
</body>
</html>