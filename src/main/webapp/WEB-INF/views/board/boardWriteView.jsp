<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <div id="conts">
        <article id="sub" class="">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
            <h1 class="basic-border-bottom">글쓰기</h1>
				<form action="/notice/register.hirp" method="post">
				<div>게시판 선택</div>
				<select name="boardCode">
					<option value="N">공지게시판</option>
					<option value="F">자유게시판</option>
					<option value="A">익명게시판</option>
					<option value="D">부서게시판</option>
				</select>
				<div>제목</div>
				<input type="text" name ="noticeTitle" style="width:1300px;">
				<div>첨부파일</div>
				<input type="file" name="uploadFile">
				<textarea name="noticeContents"></textarea>
				<input type="submit">
				</form>
				
				
           
               
               
              
               
               
               
               
              
        </article>
    </div>
</body>

</html>