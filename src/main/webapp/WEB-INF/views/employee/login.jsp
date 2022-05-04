<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<html>
<link rel="stylesheet" href="../../resources/css/employee.css">
<body id="loginPage">
	<form action="/employee/login.hirp" method="post" enctype="multipart/form-data">
		<!-- post일 떄 꼭 써줘야함 enctype 인코딩 -->
		<input name="emplId" type="text" placeholder="아이디를 입력해 주세요.">		
		<input class="mt-10" name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">

		<div class="mt-10">
			<!-- 아이디는 기능상/디자인상 필요한 경우가 아니면 추가하지 않아도 됨 -->
			<input id="check1" class="mt-20" type="checkbox">
			<label for="check1">자동 로그인</label>&nbsp;&nbsp;&nbsp;
			<input id="check2" class="mt-20" type="checkbox">
			<label for="check2">아이디 저장</label>
		</div>
		
		<button class="point mt-20" type="submit">로그인</button>
		<!-- 서브밋이면 폼 action에 url 적어줌, 온클릭은 submit 버튼 이외의 기능(예/팝업 열릴 때)만 사용 -->	
		
		<div class="mt-10 t-c">
			<a id="myLink1" style="text-decoration:underline" href="/employee/registerView.hirp">회원가입</a>&nbsp;&nbsp;
			<a id="myLink2" style="text-decoration:underline" href="/employee/findPwdView1.hirp">비밀번호 찾기</a> 
			<!-- id는 같은 게 한 페이지 안에 하나만 있어야 함 -->
		</div>
	</form>
		
	<p class="p--foot t-c">
		통합그룹웨어 문의사항은 운영 담당자에게 연락하여 주시기 바랍니다.<br>
		☎ 010-XXXX-XXXX,  담당: 하이알피 개발팀<br><br>
		<small>COPYRIGHT (c) HIRP GROUP. All Rights Reserved.</small>
	</p>
</body>
</html>