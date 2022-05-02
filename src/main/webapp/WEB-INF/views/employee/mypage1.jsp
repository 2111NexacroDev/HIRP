<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지1</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@600&family=Lexend+Exa:wght@300&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
        rel="stylesheet"><!-- 노토산스 코리안 서체 CDN -->
    <link rel="stylesheet" href="../../resources/css/reset.css"><!-- 브라우저 기본 스타일 리셋하는 CSS -->
    <link rel="stylesheet" href="../../resources/css/common.css"><!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->
</head>
<body>
	<form>
		<label>일용자님의 마이페이지로 이동을 하기 위해서는 인증 절차가<br>필요합니다. 비밀번호를 정확하게 입력해 주세요.</label><br><br><br>
	
		<label>비밀번호</label><br>
		<div id="guide" class="subConts">
			<input name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">
		</div><br>
		
		<button class="finished mt-20" type="submit" onclick="btnMypage()";>다음</button>
	</form>
</body>
</html>