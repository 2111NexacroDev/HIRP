<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기2</title>
</head>
<body>
	<form id="modifyPwdForm" action="/employee/modifyPwd.hirp" method="post"
		enctype="multipart/form-data">
		<label>비밀번호 재설정을 위하여 본인의 아이디와<br>재설정할 비밀번호를 정확하게 입력해 주세요.
		</label><br> <br> <br> <label>아이디</label><br>
		<div id="guide1" class="subConts1">
			<input name="emplId" type="text" placeholder="@hirp.com">
		</div>
		<br> <label>비밀번호</label><br>
		<div id="guide2" class="subConts2">
			<input id="emplPw1" name="emplPw1" type="password"
				placeholder="재설정할 비밀번호를 입력해 주세요."><br> <input id="emplPw2"
				name="emplPw2" type="password" placeholder="재설정할 비밀번호를 한 번 더 입력해 주세요.">
		</div>
		<br>

		<button class="finished mt-20" type="button" onclick="btn();">확인</button>
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