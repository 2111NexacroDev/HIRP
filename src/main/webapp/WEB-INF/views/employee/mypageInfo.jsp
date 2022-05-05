<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<!-- 하이알피 서브페이지 CSS -->
<head>
<meta charset="UTF-8">
<title>마이페이지2</title>
<!-- body 안에 header. conts 안에 form -->
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<form id="" action="/employee/modifyPwd.hirp" method="post">
			<aside id="snb">
				<h1>기본정보</h1>
			</aside>
			<article id="sub" class="">
				<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
				<h1 class="basic-border-bottom"></h1>
				<div id="mypage" class="subConts">
					사진 <img src="" alt="프로필사진">
					<!-- 사진 폼으로 바꿔줘야함 -->
					<button class="basic" type="button" onclick="openModal(this);">수정</button>
					<br>
					<section class="section--modal">
						<div class="bg-black"></div>
						<!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
						<div class="section--modal__conts">
							<button class="btn--close"></button>
							<h3>프로필 사진 수정</h3>
							<p class="mb-20">
								<img src="" alt="프로필사진"><br> <input type="file">
							</p>
							<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button">확인</button>
								<button class="finished closeWindow" type="button">닫기</button>
							</div>
						</div>
					</section>
				</div>
				이름 <input type="text" value="${employee.emplName }" readonly><br>
				아이디 <input type="text" value="${employee.emplId }" readonly><br>
				<div>
					비밀번호 <input type="password" value="${employee.emplPw }">
					<button class="basic" type="button" onclick="openModal(this);">재설정</button>
					<br>
					<section class="section--modal">
						<div class="bg-black"></div>
						<!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
						<div class="section--modal__conts">
							<button class="btn--close"></button>
							<h3>비밀번호 재설정</h3>
							<p class="mb-20">
								비밀번호 재설정을 위하여 재설정할 비밀번호를 정확하게 입력해 주세요.<br>
								<input id="emplPw1" name="emplPw1" type="password" placeholder="재설정할 비밀번호를 입력해 주세요."><br>
								<input id="emplPw2" name="emplPw2" type="password" placeholder="재설정할 비밀번호를 한 번 더 입력해 주세요.">
							</p>
							<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button">확인</button>
								<button class="finished closeWindow" type="button">닫기</button>
							</div>
						</div>
					</section>
				</div>
				부서 <input type="text" value="${employee.deptCode }" readonly><br>
				직위 <input type="text" value="${employee.positionCode }" readonly><br>
				직통번호 <input type="text" value="${employee.directNo }" readonly><br>
				이메일 <input type="text" value="${employee.email }" readonly><br>
				<div>
					연락처 <input type="text" value="${employee.phoneNo }">
					<button class="basic" type="button" onclick="openModal(this);">수정</button>
					<br>
					<section class="section--modal">
						<div class="bg-black"></div>
						<!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
						<div class="section--modal__conts">
							<button class="btn--close"></button>
							<h3>연락처 수정</h3>
							<p class="mb-20">변경할 연락처를 입력해주세요.</p>
							<input type="text">
							<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button">확인</button>
								<button class="finished closeWindow" type="button">닫기</button>
							</div>
						</div>
					</section>
				</div>
				생년월일 <input type="text" value="${employee.birthday }" readonly><br>
	</div>
	</article>
	</form>
	</div>
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
</body>
</html>