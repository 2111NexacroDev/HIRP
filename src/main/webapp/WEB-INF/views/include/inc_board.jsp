<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<aside id="snb">
            <h1>게시판</h1>
            <a class="btn--function" href="/board/writeView.hirp">글쓰기</a>
            <ul>
                <li>
                    <a href="">전사게시판</a>
                    <ul>
                        <li><a href="/notice/list.hirp">공지게시판</a></li>
                        <li><a href="/free/list.hirp">자유게시판</a></li>
                        <li><a href="/anonymous/list.hirp">익명게시판</a></li>
                    </ul>
                    <br><!-- 나중에 수정 -->
                </li>
                 <li>
                    <a href="">부서게시판</a>
                    <ul>       
                        <li><a href="/department/list.hirp">개발팀 게시판</a></li>
                    </ul>
                    <br><!-- 나중에 수정 -->
                </li>
                <li>
                    <a href="">나의 활동</a>
                    <ul>       
                        <li><a href="/written/board.hirp">작성한 글 조회</a></li>
                        <!-- <li><a href="#">작성한 댓글 조회</a></li> -->
                    </ul>
                </li>
            </ul>
        </aside>
</body>
</html>