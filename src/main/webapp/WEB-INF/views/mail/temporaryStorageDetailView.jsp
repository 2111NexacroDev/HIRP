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
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>메일</h1>
            <a class="btn--function" href="/mail/writeView.hirp">메일쓰기</a>

            <ul class="ul--mail">
                <li>
                    <a href="#none">메일함</a>
                    <ul>
                        <li <c:if test="${mailCategory == 'R' }">class="on"</c:if>><a href="/mail/Rlist.hirp">받은메일함</a></li>
                        <li <c:if test="${mailCategory == 'S' }">class="on"</c:if>><a href="/mail/Slist.hirp">보낸메일함</a></li>
                        <li <c:if test="${mailCategory == 'T' }">class="on"</c:if>><a href="/mail/Tlist.hirp">임시보관함</a></li>
                        <li <c:if test="${mailCategory == 'M' }">class="on"</c:if>><a href="/mail/Mlist.hirp">내게쓴메일함</a></li>
                        <li <c:if test="${mailCategory == 'I' }">class="on"</c:if>><a href="/mail/Ilist.hirp">중요메일함</a></li>
                        <li <c:if test="${mailCategory == 'W' }">class="on"</c:if>><a href="/mail/Wlist.hirp">휴지통</a><button class="basic" type="button" onclick="deleteAllMail();">비우기</button></li>
                    </ul>
                </li>
             </ul>
            
             <a class="btn--function bugReport" href="/bugReport/WriteView.hirp">
				<img src="../../../resources/images/icons/icon_bugreport.png" alt="icon">
				버그리포트 작성
			</a>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				메일쓰기
            </h1>
            <div id="mailWrite" class="subConts padding-0">
            	<form action="/mail/send.hirp" method="post" enctype="multipart/form-data">
					<div class="btns-wrap mt-20">
						<button class="basic" type="submit">보내기</button>
						<button class="basic" type="button" onclick="updateTemporaryStorage(${mail.mailNo});">임시저장</button>
					</div>
					<ul class="ul--mailWrite mt-10 mb-10 padding-20">
						<li>
							<div class="d-flex align-items-center">
								<h4>받는사람</h4>							
								<input id="check1" class="mt-20" type="checkbox" name="check1" onclick="myMail();">
								<label for="check1">나에게</label>
							</div>
							<div>
								<input type="text" id="mailRecipient" name="mailRecipient" value="${mail.mailRecipient }">
								<button class="basic" type="button">주소록</button>
							</div>
						</li>
						<li>
							<h4>참조</h4>
							<div>
								<input type="text" name="mailReferrer" value="${mail.mailReferrer }">
								<button class="basic" type="button">주소록</button>
							</div>
						</li>
						<li>
							<h4>제목</h4>
							<input type="text" name="mailTitle" value="${mail.mailTitle }">
						</li>
						<li>
							<h4>파일첨부</h4>
							<input type="file" size="50" name="uploadFile" value="${mailFile.fileName }">
						</li>
					</ul>
					<textarea id="summernote" rows="" cols="" name="mailContents">${mail.mailContents }</textarea>
            	</form>
	        </div>
        </article>
	</div>
	<script>
		// 나에게
		function myMail() {
			if($("#check1").prop("checked")) {
				$("#mailRecipient").val("${sessionScope.emplId}@hirp.com");
			}else {
				$("#mailRecipient").val("${mail.mailRecipient }");
			}
		}

		// 임시저장된 메일 수정
		function updateTemporaryStorage(mailNo) {
			var mailRecipient = $("input[name=mailRecipient]").val();
			var mailReferrer = $("input[name=mailReferrer]").val();
			var mailTitle = $("input[name=mailTitle]").val();
			var mailFile = $("input[name=uploadFile]").val();
			var mailContents = $("textarea[name=mailContents]").val();
			$.ajax({
				url : "/mail/updateTemporaryStorage.hirp",
				type : "post",
				data : { "mailNo" : mailNo,
						 "mailRecipient" : mailRecipient,
						 "mailReferrer" : mailReferrer,
						 "mailTitle" : mailTitle,
						 "mailFile" : mailFile,
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