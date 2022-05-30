<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
	<link rel="stylesheet" href="../../resources/css/employee.css">
	<body class="page--employee">	
		<form id="modifyPwdForm" action="/employee/modifyPwd.hirp" method="post" enctype="multipart/form-data">
			<h1>비밀번호 재설정</h1>
			<p>비밀번호 재설정을 위하여 본인의 아이디와<br>재설정할 비밀번호를 정확하게 입력해 주세요.</p>
			<div id="guide1" class="subConts1 mt-30">
				<label>아이디</label>
				<input name="emplId" type="text" placeholder="@hirp.com">
			</div>
			<div id="guide2" class="subConts2 mt-30">
				<label>비밀번호</label>
				<input id="emplPw1" name="emplPw1" type="password" placeholder="재설정할 비밀번호를 입력해 주세요."><br>
				<input id="emplPw2" class="mt-10" name="emplPw2" type="password" placeholder="재설정할 비밀번호를 한 번 더 입력해 주세요.">
			</div>

			<button class="point mt-20" type="submit" onclick="btn();">확인</button>
			<script>
				function btn() {
					var p1 = document.getElementById('emplPw1').value;
					var p2 = document.getElementById('emplPw2').value;
					if (p1 != p2) {
						alert("비밀번호가 일치 하지 않습니다");
						return false;
					} else {
						alert("비밀번호 재설정이 완료되었습니다.\n로그인 페이지로 이동합니다.");
						document.getElementById('modifyPwdForm').submit();
					}
				}
			</script>
		</form>
	</body>
</html>