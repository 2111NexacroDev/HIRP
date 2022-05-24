<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
	<link rel="stylesheet" href="../../resources/css/employee.css">
	<body class="page--employee">
		<form action="/employee/findPwd.hirp" method="post" enctype="multipart/form-data"> 
			<!-- 2로 가는게 아니라 비교하는 곳으로 보내줌 -->
			<h1>비밀번호 찾기</h1>
			<p>비밀번호 재설정을 위하여 회원가입 시 입력하신<br>아이디, 이름, 생년월일을 정확하게 입력해 주세요.</p>
			
			<div>
				<label>아이디</label>
				<input name="emplId" type="text" placeholder="@hirp.com">
			</div>
			
			<div>
				<label>이름</label>
				<input name="emplName" type=text placeholder="이름을 입력해 주세요.">
			</div>
			
			<div>
				<label>생년월일</label>
				<input name="birthday" type="date">
			</div>

			<button class="point mt-20" type="submit">다음</button>
		</form>
	</body>
</html>