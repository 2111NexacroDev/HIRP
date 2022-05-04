<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@600&family=Lexend+Exa:wght@300&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
	rel="stylesheet">
<!-- 노토산스 코리안 서체 CDN -->
<link rel="stylesheet" href="../../resources/css/reset.css">
<!-- 브라우저 기본 스타일 리셋하는 CSS -->
<link rel="stylesheet" href="../../resources/css/common.css">
<!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->
</head>
<body>
	<form action="/employee/login.hirp" method="post" enctype="multipart/form-data"> <!-- post일 떄 꼭 써줘야함 enctype 인코딩 -->
		<label>아이디</label>
		<div id="guide1" class="subConts1">
			<input name="emplId" type="text" placeholder="@hirp.com">
		</div><br><br>
		
		<label>비밀번호</label>
		<div id="guide2" class="subConts2">
			<input name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">
		</div>

		<input id="check1" class="mt-20" type="checkbox">
		<label for="check1">자동 로그인</label>&nbsp;&nbsp;&nbsp;
		<input id="check1" class="mt-20" type="checkbox">
		<label for="check1">아이디 저장</label><br>
		
		<button class="finished mt-20" type="submit";>로그인</button><br><br> <!-- 서브밋이면 폼에 url 적어줌 온클릭 팝업열릴때만사용-->
		
		<a id="myLink1" style="text-decoration:underline" href="/employee/registerView.hirp" onclick="btnRegister2()"; return false;">회원가입</a>&nbsp;&nbsp;
		<a id="myLink2" style="text-decoration:underline" href="/employee/findPwdView1.hirp" onclick="btnfindPwd()"; return false;">비밀번호 찾기</a> <!-- id는 같은 게 한 페이지 안에 하나만 있어야 함 -->
	</form>
</body>
</html>