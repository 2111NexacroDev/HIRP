<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="../../../resources/css/common.css">
<link rel="stylesheet" href="../../../resources/css/chat.css">
<meta charset="UTF-8">
<title>채팅</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/chat/chatHeader.jsp" %>
	<div id="conts">
        <article id="sub" class="">
        	
        	<h1 class="chat-h1 basic-border-bottom">직원</h1>

            <div id="" class="subConts">
            	<div class="chat-row mt-20 basic-border-bottom padding-bottom">
				    <div class="mr-20" style="width:30px;">
		      		    <button class="btn--profile" type="button">
					        <img src="../resources/images/profile.jpg" alt="profile">
					        <!-- 유저마다 다른 사진 출력돼야함 -->
					    </button>
				    </div>
				    <div class="">
				    	이민선 대리
				    </div>
            	</div>
			    
			    <div class="row mt-20">
				    <input type="text" name="emplSearchKeyword" size="25" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onclick="emplSearch();">검색</button>
			    </div>
        	</div>
        </article>
    </div>
</body>
</html>