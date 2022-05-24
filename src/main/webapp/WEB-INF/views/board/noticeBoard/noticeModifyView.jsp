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
		
		<h1 class="basic-border-bottom">공지게시판</h1>

		<div id="noticeModify" class="subConts page--board-write">
			<form action="/notice/modify.hirp" method="post" enctype="multipart/form-data">
				<input type="hidden" name="boardCode" value="${notice.boardCode}">
				<input type="hidden" name="noticeNo" value="${notice.noticeNo}">
				<table id="modify-table">
					<tbody>
						<tr>
							<td>제목</td>
							<td><input type="text" id="noticeTitle"name="noticeTitle" value="${notice.noticeTitle }"></td>
						</tr>
						<tr>
							<td>작성자</td>
							<td><input type="text" name="emplId" value="${notice.emplId }" readonly></td>
						</tr>
						<tr>
							<td>내용</td>
							<td><textarea name="noticeContents" >${notice.noticeContents }</textarea></td>
						</tr>
						<tr>
							<td>첨부파일</td>
							<td>
								<input type="file" name="reloadFile" multiple >							
								<c:forEach var="fList" items="${notice.bList}">
									<span class="mr-10">${fList.fileName}</span>									
								</c:forEach>
								<!-- <p><img src="../../../../resources/nuploadFiles/${fList.fileName}" alt="미리보기"></p> -->
								<!-- 파일 경로 수정 필요 -->
							</td>
						</tr>
					</tbody>
				</table>
				<div class="btns-wrap">
					<button class="point" type="submit">수정하기</button>
				</div>
			</form>
		</div>
	</article>
</body>
</html>