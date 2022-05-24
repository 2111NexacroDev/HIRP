<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<head>
<meta charset="UTF-8">
<title></title>
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
            
            <a class="btn--function" href="/bugReport/WriteView.hirp">버그리포트 작성</a>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>
        	<h1 class="basic-border-bottom">
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
            
            <input id="check1" class="mt-20" type="checkbox" onclick="selectAll(this);">
            <label for="check1"></label>
            <button class="basic mt-20" type="button">답장</button>
            <button class="basic mt-20" type="button" value="${mail.mailNo }" onclick="wasteMail();">삭제</button>
            <button class="basic mt-20" type="button">전달</button>
            <c:if test="${mailCategory == 'W' }">
            	<button class="basic mt-20" type="button" onclick="restoreMail();">복구</button>
            </c:if>
            
            <div class="subConts">
	        	<table class="table--basic mt-20" style="margin-top: 40px;">
                   	<c:forEach items="${mList }" var="mail">
                    	<!-- 받은메일함 -->
                    	<c:if test="${mailCategory == 'R' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td class="mail--star">
									<input type="checkbox" id="important" name="impMail" value="${mail.mailNo }" onclick="importantMail(this);">
									<label for="important"></label>
								</td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
	                    <!-- 보낸메일함 -->
                    	<c:if test="${mailCategory == 'S' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td class="mail--star">
									<input type="checkbox" id="important" name="impMail" value="${mail.mailNo }" onclick="importantMail(this);">
									<label for="important"></label>
								</td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
	                    <!-- 임시보관함 -->
	                    <c:if test="${mailCategory == 'T' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td class="mail--star">
									<input type="checkbox" id="important" value="${mail.mailNo }" onclick="importantMail(this);">
									<label for="important"></label>
								</td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
	                    <!-- 내게쓴메일함 -->
	                    <c:if test="${mailCategory == 'M' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td class="mail--star">
									<input type="checkbox" id="important" value="${mail.mailNo }" onclick="importantMail(this);">
									<label for="important"></label>
								</td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
	                    <!-- 중요메일함 -->
	                    <c:if test="${mailCategory == 'I' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td class="mail--star">
									<input type="checkbox" id="important" value="${mail.mailNo }" onclick="importantMail(this);">
									<label for="important"></label>
								</td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
	                    <!-- 휴지통 -->
	                    <c:if test="${mailCategory == 'W' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" name="mail" value="${mail.mailNo }"></td>
								<td><a href="${mDetail}">${mail.mailTitle }</a></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
					</c:forEach>
                </table>
                <!-- 받은메일함 페이징 -->
                <c:if test="${mailCategory == 'R' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Rlist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Rlist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Rlist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
                <!-- 보낸메일함 페이징 -->
                <c:if test="${mailCategory == 'S' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Slist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Slist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Slist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
                <!-- 임시보관함 페이징 -->
                <c:if test="${mailCategory == 'T' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Tlist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Tlist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Tlist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
                <!-- 내게쓴메일함 페이징 -->
                <c:if test="${mailCategory == 'M' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Mlist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Mlist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Mlist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
                <!-- 중요메일함 페이징 -->
                <c:if test="${mailCategory == 'I' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Ilist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Ilist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Ilist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
                <!-- 휴지통 페이징 -->
                <c:if test="${mailCategory == 'W' }">
	                <div class="btns--paging">
		                <c:if test="${pi.currentPage > '1' }">
		                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/mail/Wlist.hirp?page=${pi.currentPage-1 }'"></button>
		                </c:if>
		                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
		                	<c:url var="pagination" value="/mail/Wlist.hirp">
		                		<c:param name="page" value="${p }"></c:param>
		                	</c:url>
		                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
		                </c:forEach>
		                <c:if test="${pi.currentPage < pi.endNavi }">
		                	<button class="fa-solid fa-angle-right next" onclick="location.href='/mail/Wlist.hirp?page=${pi.currentPage+1 }'"></button>
		                </c:if>
	                </div>
                </c:if>
			</div>
        </article>
	</div>
	<script>
		function selectAll(selectAll) {
			const checkboxes = document.getElementsByName("mail");
			
			checkboxes.forEach((checkbox) => {
				checkbox.checked = selectAll.checked;
			})
		};
		
		// 체크박스 선택 후 버튼 클릭 메일 휴지통으로 이동
		function wasteMail() {
			var mailTag = $("input[name=mail]:checked");
			var mailNo = [];
			for(var i = 0; i < mailTag.length; i++) {
				mailNo.push(mailTag[i].value);
			}
			$.ajax({
				url : "/mail/wasteMail.hirp",
				type : "post",
				data : { "mailNo" : mailNo },
				traditional : true,
				success : function() {
					location.reload();
				},
				error : function() {
					alert("ajax 실패!");
				}
			});
		};
		
		// 휴지통 메일 복구
		function restoreMail() {
			var mailTag = $("input[name=mail]:checked");
			var mailNo = [];
			for(var i = 0; i < mailTag.length; i++) {
				mailNo.push(mailTag[i].value);
			}
			$.ajax({
				url : "/mail/restoreMail.hirp",
				type : "post",
				data : { "mailNo" : mailNo },
				traditional : true,
				success : function() {
					location.reload();
				},
				error : function() {
					alert("ajax 실패!");
				}
			});
		}
		
		// 중요메일
		function importantMail(imp) {
			var mailNo = $(imp).val();
			var chkimp = $(imp).prop("checked");
			var importantMail;
			if(chkimp == true) {
				importantMail = 'Y';
			}else {
				importantMail = 'N';
			}
			$.ajax({
				url : "/mail/impMail.hirp",
				type : "post",
				data : { "mailNo" : mailNo, "importantMail" : importantMail },
				success : function() {},
				error : function() {
					alert("ajax 실패!");
				}
			});
		}
	</script>
	<script src="../../../resources/js/mail.js"></script>
</body>
</html>