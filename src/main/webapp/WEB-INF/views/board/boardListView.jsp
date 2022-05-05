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
        <aside id="snb">
            <h1>게시판</h1>
            <a class="btn--function" href="/board/writeView.hirp">글쓰기</a>
            <ul>
                <li>
                    <a href="">전사게시판</a>
                    <ul>
                        <li><a href="#">공지게시판</a></li>
                        <li><a href="#">자유게시판</a></li>
                        <li><a href="#">익명게시판</a></li>
                    </ul>
                    <br><!-- 나중에 수정 -->
                </li>
                 <li>
                    <a href="">부서게시판</a>
                    <ul>       
                        <li><a href="#">개발팀 게시판</a></li>
                    </ul>
                    <br><!-- 나중에 수정 -->
                </li>
                <li>
                    <a href="">나의 활동</a>
                    <ul>       
                        <li><a href="#">작성한 글 조회</a></li>
                        <li><a href="#">작성한 댓글 조회</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub" class="">
       
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

           
            <h1 class="basic-border-bottom">게시판 홈</h1>

            <div id="guide" class="subConts">
                
            </div>
            
            
                <table class="table--basic mt-20">
                    <thead>
                        <tr>
							<th>번호</th>
							<th>제목</th>
							<th>작성자</th>
							<th>작성일</th>
							<th>조회수</th>
						<!--<th>첨부파일</th>-->
						</tr>
                    </thead>
                    <c:forEach items="${nList }" var="notice">
                    <tbody>
                        <tr>
                           	<c:url var="nDetail" value="/notice/detail.hirp">
								<c:param name="noticeNo" value="${notice.noticeNo }"></c:param>
							</c:url>
							<td><a href="${nDetail }">${notice.noticeNo }</a></td>
							
							<td><a href="${nDetail }">&nbsp; ${notice.noticeTitle }</a></td>
							<td>${notice.emplId }</td>
							<td>${notice.writeDate}</td>
							<td>${notice.noticeCount }</td>
						<!--<td>&nbsp;&nbsp;${board.boardFilename}</td>-->
                        </tr>
                        </tbody>
                        </c:forEach>
				</table>
                    <button class="basic mt-20">이전</button>
						<c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
							<c:url var="pagination" value="/notice/list.hirp">
								<c:param name="page" value="${p}"></c:param>
							</c:url>
							&nbsp;<a href="${pagination }">${p }</a>&nbsp;
						</c:forEach>
					<button class="basic mt-20">다음</button>
					<form action="/notice/searchList.hirp" method="get">
						<select name="searchCondition">
							<option value="all">전체</option>
							<option value="title">제목</option>
							<option value="contents">내용</option>
							<option value="writer">작성자</option>
						</select>
						<input type="text" name="searchValue">
						<input type="submit" value="검색">
					</form>
        </article>
    </div>
</body>

</html>