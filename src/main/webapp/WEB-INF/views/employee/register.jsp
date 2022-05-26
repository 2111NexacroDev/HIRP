<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
	<link rel="stylesheet" href="../../resources/css/employee.css">
	<body class="page--employee">
		<form id="registerForm" class="shadow" action="/employee/register.hirp" method="post" enctype="multipart/form-data"> 
			<!-- form이 있어야 controller로 넘어감 -> db    -->
			<div class="subConts1">
				<label>아이디</label>
				<input name="emplId" type="text" placeholder="20자 내의 영문으로 작성하셔야 합니다."> 
				<!-- name은 컨트롤러 저장위해 필요. 컨트롤러와 같아야함 -->
			</div>
			
			<div class="subConts2">
				<label>비밀번호</label>
				<input name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">
			</div>
			
			<div class="subConts3">
				<label>이름</label>
				<input name="emplName" type="text" placeholder="이름을 입력해주세요.">
			</div>
			
			<div>
				<label>생년월일</label>
				<input name="birthday" type="date">
			</div>
			
			<div class="subConts4">
				<label>연락처</label>
				<input name="phoneNo" type="text" placeholder="010-1234-5678">
			</div>
			
			<div name="gender"> 
				<label>성별</label>
				<!-- 라디오는 name같게. id와 for 같게 -->
				<input id="female" name="gender" type="radio" value="여성" checked>
				<label for="female">여성</label>
				<input id="male" name="gender" type="radio" value="남성">
				<label for="male">남성</label>
				<input id="etc" name="gender" type="radio" value="기타">
				<label for="etc">기타</label>
			</div>
			
			<button class="point mt-20" type="submit" onclick="btnRegister()";>회원가입</button>
		</form>
		<script> 
			function btnRegister(){ 
				alert('회원가입이 완료되었습니다.\n관리자 승인 후 로그인이 가능합니다.'); 
				$('#registerForm').submit();
			} 
		</script>
	</body>
</html>