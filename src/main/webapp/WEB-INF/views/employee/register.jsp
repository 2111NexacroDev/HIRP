<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@600&family=Lexend+Exa:wght@300&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
        rel="stylesheet"><!-- 노토산스 코리안 서체 CDN -->
    <link rel="stylesheet" href="../../resources/css/reset.css"><!-- 브라우저 기본 스타일 리셋하는 CSS -->
    <link rel="stylesheet" href="../../resources/css/common.css"><!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->
</head>
<body>
	<form action="/employee/register.hirp" method="post" enctype="multipart/form-data"> <!--    form이 있어야 controller로 넘어감 -> db    -->
		<label>아이디</label><br>
		<div id="guide1" class="subConts1">
			<input name="emplId" type="text" placeholder="@hirp.com"> <!-- name은 컨트롤러 저장위해 필요. 컨트롤러와 같아야함 -->
		</div><br>
		
		<label>비밀번호</label><br>
		<div id="guide2" class="subConts2">
			<input name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">
		</div><br>
		
		<label>이름</label><br>
		<div id="guide3" class="subConts3">
			<input name="emplName" type="text" placeholder="이름을 입력해주세요.">
		</div><br>
		
		<label>생년월일</label><br>
		<input name="birthday" class="mt-20" type="date"><br><br>
		
		<label>연락처</label><br><br>
		<div id="guide4" class="subConts4">
			<input name="phoneNo" type="text" placeholder="010-1234-5678">
		</div><br>
		
		<label>성별</label><br><br>
		<div name="gender" id="guide5" class="basic-border"> <!-- 라디오는 name같게. id와 for 같게 -->
			<input id="valueA" class="mt-20" name="gender" type="radio" value="여성">
		    <label for="valueA">여성</label>
		    <input id="valueB" class="mt-20" name="gender" type="radio" value="남성">
		    <label for="valueB">남성</label>
		    <input id="valueC" class="mt-20" name="gender" type="radio" value="기타">
		    <label for="valueC">기타</label>
	    </div><br>
	    
		<button class="finished mt-20" type="submit" onclick="btnRegister()";>회원가입</button>
		<script> function btn(){ alert('회원가입이 완료되었습니다.\n관리자 승인 후 로그인이 가능합니다.'); } </script>
	</form>
</body>
</html>