<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
                        <li><a href="/notice/list.hirp">공지게시판</a></li>
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
               
               
				<h3>공지게시판 새글</h3>
                <table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>제목1</th>
                            <th>제목2</th>
                            <th>제목3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>
				<br><br><br><!-- 나중에 수정 -->
				<h3>부서게시판 새글</h3>
				<table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>제목1</th>
                            <th>제목2</th>
                            <th>제목3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>
               
              
        </article>
    </div>
</body>

</html>