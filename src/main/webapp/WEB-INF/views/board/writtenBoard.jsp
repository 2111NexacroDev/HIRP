<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <%@ include file="/WEB-INF/views/include/inc_board.jsp" %>

        <article id="sub" class="">
       
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

           
            <h1 class="basic-border-bottom">내가 작성한 글</h1>

            <div id="guide" class="subConts">
                
            </div>
            
            
                <table class="table--basic mt-20">
                    <thead>
                        <tr>
							<th>번호</th>
							<th>제목</th>
							<th>작성일</th>
							<th>첨부파일</th>
						</tr>
                    </thead>
                    <c:forEach var="notice" items="${nList }">
                    <tbody>
                        <tr>
                           	<c:url var="nDetail" value="/notice/detail.hirp">
								<c:param name="noticeNo" value="${notice.noticeNo }"></c:param>
							</c:url>
							<td><a href="${nDetail }">${notice.noticeNo }</a></td>
							
							<td><a href="${nDetail }">&nbsp; ${notice.noticeTitle }</a></td>
							<td>${notice.writeDate}</td>
							<td>${notice.noticeCount }</td>
							<td>
							<c:if test="${empty notice.bList}">X</c:if>
							<c:if test="${not empty notice.bList}">O</c:if>
							</td>
                        </tr>
                        </tbody>
                        </c:forEach>
				</table>
				<div class="btn--paging">
                    <button class="basic mt-20">이전</button>
						<c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
							<c:url var="pagination" value="/notice/list.hirp">
								<c:param name="page" value="${p}"></c:param>
							</c:url>
							&nbsp;<a href="${pagination }">${p }</a>&nbsp;
						</c:forEach>
					<button class="basic mt-20">다음</button>
				</div>
				
        </article>
    </div>
</body>

</html>