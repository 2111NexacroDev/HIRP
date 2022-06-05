<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css?after">
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>메일</h1>
            <a class="btn--function" href="/mail/writeView.hirp">메일쓰기</a>

            <ul class="ul--mail">
<<<<<<< HEAD
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
=======
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
>>>>>>> refs/remotes/origin/main
            
             <a class="btn--function bugReport" href="/bugReport/WriteView.hirp">
				<img src="../../../resources/images/icons/icon_bugreport.png" alt="icon">
				버그리포트 작성
			</a>
        </aside>

        <article id="sub" class="mailDetail">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>
        	
        	<h1 class="basic-border-bottom">
				임시 제목 고치기
				<c:if test="${mailCategory == 'R' }">
					받은메일함
	            </c:if>
	            <c:if test="${mailCategory == 'S' }">
					보낸메일함
	            </c:if>
            	<c:if test="${mailCategory == 'T' }">
					임시보관함
            	</c:if>
            	<c:if test="${mailCategory == 'M' }">
					내게쓴메일함
            	</c:if>
            	<c:if test="${mailCategory == 'I' }">
					중요메일함
            	</c:if>
            	<c:if test="${mailCategory == 'W' }">
					휴지통
            	</c:if>
            </h1>
<<<<<<< HEAD
            <button class="basic mt-20" type="button" onclick="location.href='/mail/mailReplyView.hirp?mailNo=${mail.mailNo}'">답장</button>
            <button class="basic mt-20" type="button" onclick="wasteMail(${mail.mailNo});">삭제</button>
            <button class="basic mt-20" type="button" onclick="location.href='/mail/mailRelayView.hirp?mailNo=${mail.mailNo}'">전달</button>
            <!-- 오른쪽으로 밀어야 함 -->
            <button class="basic mt-20" type="button" onclick="historyBack();">목록</button>
            
            <div class="subConts">
	            <form action="/mail/{mailCategory}detail.hirp" method="get">
	            	<table class="table--basic mt-20">	        	
=======

			<div class="btns-wrap padding-20">
				<button class="basic" type="button" onclick="location.href='/mail/mailReplyView.hirp'">답장</button>
				<button class="basic" type="button" onclick="wasteMail(${mail.mailNo});">삭제</button>
				<button class="basic" type="button" onclick="location.href='/mail/mailRelayView.hirp'">전달</button>
				<!-- 오른쪽으로 밀어야 함 -->
				<button class="basic" style="float:right;"><a href="/mail/list.hirp">목록</a></button>
			</div>            
            <div class="subConts padding-0">
	            <form class="padding-20" action="/mail/detail.hirp" method="get">
	            	<table class="table--basic">	        	
>>>>>>> refs/remotes/origin/main
	                    <colgroup>
	                        <col style="width:10%;">
	                        <col style="width:90%;">
	                    </colgroup>
	            		<tr>
							<td class="td--mailTitle" colspan="2">
								<div class="mail--star">
									<input type="checkbox" id="important" name="impMail" value="${mail.mailNo }" onclick="importantMail(this);"
									<c:if test="${mail.importantMail == 'Y' }">checked</c:if>>
									<label for="important"></label>
								</div>
								<h3>${mail.mailTitle }</h3>
							</td>
	            		</tr>
	            		<tr>
	            			<td>보낸사람 :</td>
	            			<td>${mail.mailSender }</td>
	            		</tr>
	            		<tr>
	            			<td>받는사람 :</td>
	            			<td>${mail.mailRecipient }</td>
	            		</tr>
	            		<tr>
	            			<td style="padding-bottom:20px;">보낸날짜 :</td>
	            			<td style="padding-bottom:20px;">${mail.mailDate }</td>
	            		</tr>
						<tr>
							<td class="td--mailFile" colspan="2">
								<c:if test="${mailFile.fileReName ne null}">
									<a href="../../../resources/nuploadFiles/${mailFile.fileReName }" download>${mailFile.fileName }</a>
								</c:if>
								<c:if test="${mailFile.fileReName eq null}">
										등록된 첨부파일이 없습니다.
								</c:if>
							</td>
						</tr>
	            		<tr>
	            			<td colspan="2" style="padding-top:20px;">${mail.mailContents }</td>
	            		</tr>
	            	</table>
	            </form>
            </div>
		</article>
	</div>
	<script>
		function historyBack() {
			history.back();
		}
	
		// 메일 휴지통 이동
		function wasteMail(mailNo) {
			$.ajax({
				url : "/mail/wasteMail.hirp",
				type : "post",
				data : { "mailNo" : mailNo },
				success : function() {
					// 이전페이지로 가서 새로고침
					window.location = document.referrer;
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