<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css">

<!-- textarea 에디터 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>
                	메일
            </h1>
            <a class="btn--function" href="/mail/writeView.hirp">메일쓰기</a>

            <ul>
               <li>
                   <a href="">메일함</a>
                   <ul>
                       <li><a href="/mail/Rlist.hirp">받은메일함</a></li>
                       <li><a href="/mail/Slist.hirp">보낸메일함</a></li>
                       <li><a href="/mail/Tlist.hirp">임시보관함</a></li>
                       <li><a href="/mail/Mlist.hirp">내게쓴메일함</a></li>
                       <li><a href="/mail/Ilist.hirp">중요메일함</a></li>
                       <li><a href="/mail/Wlist.hirp">휴지통</a><button class="basic mt-20" type="button" onclick="deleteAllMail();">비우기</button></li>
                   </ul>
               </li>
            </ul>
            
            <a class="btn--function bugReport" href="/bugReport/WriteView.hirp">버그리포트 작성</a>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				메일쓰기
            </h1>
            <div class="subConts">
<!--             	폼태그 바꿔줘야함 -->
            	<form action="/mail/send.hirp" method="post" enctype="multipart/form-data">
		            <button class="basic mt-20" type="submit">보내기</button>
		            <button class="basic mt-20" type="button" onclick="updateTemporaryStorage(${mail.mailNo});">임시저장</button>
	            	<h4>받는사람</h4>
	            	<!-- 체크박스 선택하면 로그인 유저 아이디 나와야 함 -->
	            	<input id="check1" class="mt-20" type="checkbox">
	            	<label for="check1">나에게</label>
	            	<input type="text" name="mailRecipient" value="${mail.mailRecipient }">
	            	<button class="basic mt-20" type="button">주소록</button><br>
	            	<h4>참조</h4>
	            	<input type="text" name="mailReferrer" value="${mail.mailReferrer }">
	            	<button class="basic mt-20" type="button">주소록</button><br>
	            	<h4>제목</h4>
	            	<input type="text" name="mailTitle" value="${mail.mailTitle }"><br>
	            	<h4>파일첨부</h4>
	            	<input type="file" size="50" name="uploadFile" value="${mailFile.fileName }">
	            	<button class="basic mt-20" type="button">모두 삭제</button>
	            	<textarea id="summernote" rows="" cols="" name="mailContents">${mail.mailContents }</textarea>
            	</form>
	        </div>
        </article>
	</div>
	<script>
		// 임시저장된 메일 수정
		function updateTemporaryStorage(mailNo) {
			var mailRecipient = $("input[name=mailRecipient]").val();
			var mailReferrer = $("input[name=mailReferrer]").val();
			var mailTitle = $("input[name=mailTitle]").val();
// 			var mailFile = $("input[name=uploadFile]").val();
			var mailContents = $("textarea[name=mailContents]").val();
			$.ajax({
				url : "/mail/updateTemporaryStorage.hirp",
				type : "post",
				data : { "mailNo" : mailNo,
						 "mailRecipient" : mailRecipient,
						 "mailReferrer" : mailReferrer,
						 "mailTitle" : mailTitle,
// 						 "mailFile" : mailFile,
						 "mailContents" : mailContents},
				success : function() {
					location.href="Tlist.hirp";
				},
				error : function() {
					alert("ajax 실패!");
				}
			});
		}
	</script>
	<script src="../../../resources/js/mail.js"></script>
</body>
</html>