<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <article id="sub" class="bg--gray">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                개인업무관리
            </h1>

            <div id="todo" class="subConts">
                <div class="todo__wrap">
                    <section class="todo--today">
                        <h2>TODAY</h2>
                        <ul>
                            <c:forEach items="${tList }" var="todo">
                                <li>
                                    <input id="todo${todo.todoNo }" type="checkbox">
                                    <label for="todo${todo.todoNo }"></label>
                                    <input name="" type="text" value="${todo.todoConts }">
                                    <div class="btns-wrap">
                                        <button class="point">수정</button>
                                        <button class="finished">삭제</button>
                                    </div>
                                </li>
                            </c:forEach>
                        </ul>
                        <button class="btn--plus" type="button"></button>
                    </section>
                    <section class="todo--week">
                        <h2>WEEK</h2>
                        <ul>
                            <li><a href="#">2022-04-19</a></li>
                            <li><a href="#">2022-04-20</a></li>
                            <li><a href="#">2022-04-21</a></li>
                            <li><a href="#">2022-04-22</a></li>
                            <li><a href="#">2022-04-23</a></li>
                        </ul>
                    </section>
                </div>
                <section class="memo--list">
                    <h2>MEMO</h2>
                    <ul>
                        <c:forEach items="${mList }" var="memo">
                            <li>
                                <textarea name="memo${memo.memoNo }">${memo.memoConts}</textarea>
                                <div class="btns-wrap">
                                    <button class="point">수정</button>
                                    <button class="finished">삭제</button>
                                </div>
                            </li>
                        </c:forEach>
                    </ul>
                    <button class="btn--plus" type="button"></button>
                </section>
            </div>
        </article>
    </div>

    <script>
        $('.todo--today .btn--plus').on('click', function () {
            $('.todo--today ul').append(
                '<li>' +
                '<input id="todoNew" type="checkbox">' +
                '<label for="todoNew"></label>' +
                '<input name="" type="text" value="">' +
                '<div class="btns-wrap">' +
                '<button class="point">등록</button>' +
                '<button class="finished">삭제</button>' +
                '</div>' +
                '</li>'
            );
        });

        $('.memo--list .btn--plus').on('click', function () {
            $('.memo--list ul').append(
                '<li>' +
                '<textarea name="memo${memo.memoNo }"></textarea>' +
                '<div class="btns-wrap">' +
                '<button class="point">등록</button>' +
                '<button class="finished">삭제</button>' +
                '</div>' +
                '</li>'
            );
        });
    </script>
</body>

</html>