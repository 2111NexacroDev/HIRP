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
                       <li><a href="#">받은메일함</a></li>
                       <li><a href="#">보낸메일함</a></li>
                       <li><a href="#">임시보관함</a></li>
                       <li><a href="#">내게쓴메일함</a></li>
                       <li><a href="#">중요메일함</a></li>
                       <li><a href="#">휴지통</a><button class="basic mt-20" type="button">비우기</button></li>
                   </ul>
               </li>
            </ul>
            
            <a class="btn--function" href="#">버그리포트 작성</a>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>
            
        	<h1 class="basic-border-bottom">
				받은메일함
            </h1>
            <input id="check1" class="mt-20" type="checkbox">
            <label for="check1"></label>
            <button class="basic mt-20" type="button">답장</button>
            <button class="basic mt-20" type="button">삭제</button>
            <button class="basic mt-20" type="button">전달</button>
            
            <div class="subConts">
	        	<table class="table--basic mt-20" style="margin-top: 40px;">
                   	<c:forEach items="${mList }" var="mail">
                    	<!-- 받은메일함 -->
                    	<c:if test="${mailCategory == 'S' }">
	                        <tr>
	                            <c:url var="mDetail" value="/mail/detail.hirp">
									<c:param name="mailNo" value="${mail.mailNo }"></c:param>
								</c:url>
								<td><input type="checkbox" value="${mail.mailNo }"></td>
								<td>${mail.mailSender }</td>
								<td>${mail.mailDate }</td>
	                        </tr>
	                    </c:if>
					</c:forEach>
                </table>
                <div class="btns--paging">
	                <c:if test="${pi.currentPage > '1' }">
	                	<button class="fa-solid fa-angle-left prev" onclick="location.href='/project/list.hirp?page=${pi.currentPage-1 }'"></button>
	                </c:if>
	                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
	                	<c:url var="pagination" value="/mail/receivedList.hirp">
	                		<c:param name="page" value="${p }"></c:param>
	                	</c:url>
	                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
	                </c:forEach>
	                <c:if test="${pi.currentPage < pi.endNavi }">
	                	<button class="fa-solid fa-angle-right next" onclick="location.href='/project/list.hirp?page=${pi.currentPage+1 }'"></button>
	                </c:if>
                </div>
			</div>
        </article>
	</div>
</body>
</html>