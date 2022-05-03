<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기1</title>
</head>
<body>
	<form action="/employee/findPwd.hirp" method="post" enctype="multipart/form-data"> <!-- 2로 가는게 아니라 비교하는 곳으로 보내줌 -->
		<label>비밀번호 재설정을 위하여 회원가입 시 입력하신<br>아이디, 이름, 생년월일을 정확하게 입력해 주세요.</label><br><br><br>
		
		<label>아이디</label><br>
		<div id="guide1" class="subConts1">
			<input name="emplId" type="text" placeholder="@hirp.com">
		</div><br>
		
		<label>이름</label><br>
		<div id="guide2" class="subConts2">
			<input name="emplName" type=text placeholder="이름을 입력해 주세요.">
		</div><br>
		
		<label>생년월일</label><br>
		<input name="birthday" class="mt-20" type="date"><br>
		
		<button class="finished mt-20" type="button" onclick="location.href='/employee/findPwdView2.hirp'";>다음</button>
	</form>
</body>
</html>