<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기1</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@600&family=Lexend+Exa:wght@300&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
        rel="stylesheet"><!-- 노토산스 코리안 서체 CDN -->
    <link rel="stylesheet" href="../../resources/css/reset.css"><!-- 브라우저 기본 스타일 리셋하는 CSS -->
    <link rel="stylesheet" href="../../resources/css/common.css"><!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->
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