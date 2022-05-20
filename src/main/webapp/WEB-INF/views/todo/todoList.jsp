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
        <aside id="snb">
            <h1>개인업무관리</h1>
            <ul>
                <li>
                    <a href="">업무 관리</a>
                    <ul>
                        <li><a href="/todo/list.hirp">할 일/메모 목록</a></li>
                        <li><a href="/todo/doneList.hirp">완료 목록</a></li>
                    </ul>
                </li>
                 <li>
                    <a href="/schedule/list.hirp">일정 관리</a>
                </li>
            </ul>
        </aside>

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
                                    <c:if test="${todo.isFinished eq 'Y' }">
                                        <input id="${todo.todoNo }" type="checkbox" checked>
                                    </c:if>
                                    <c:if test="${todo.isFinished eq 'N' }">
                                        <input id="${todo.todoNo }" type="checkbox">
                                    </c:if>
                                    <label for="${todo.todoNo }"></label>
                                    <input name="todoConts" type="text" value="${todo.todoConts }">
                                    <div class="btns-wrap">
                                        <button class="point" onclick="editTodo(${todo.todoNo }, this)">수정</button>
                                        <button class="finished" onclick="removeTodo(${todo.todoNo })">삭제</button>
                                    </div>
                                </li>
                            </c:forEach>
                            <c:choose>
                                <c:when test="${empty tList}">
                                    <li class="no-data">
                                        <p>등록된 내용이 없습니다.</p>
                                    </li>
                                </c:when>
                            </c:choose>
                        </ul>
                        <button class="btn--plus" type="button"></button>
                    </section>
                    <section class="todo--month">
                        <h2>MONTH</h2>
                        <div id="todoCalendar"></div>
                    </section>
                </div>
                <section class="memo--list">
                    <h2>MEMO</h2>
                    <ul>
                        <c:forEach items="${mList }" var="memo">
                            <li>
                                <textarea name="memoConts">${memo.memoConts}</textarea>
                                <div class="btns-wrap">
                                    <button class="point" onclick="editMemo(${memo.memoNo }, this)">수정</button>
                                    <button class="finished" onclick="removeMemo(${memo.memoNo })">삭제</button>
                                </div>
                            </li>
                        </c:forEach>
                        <c:choose>
                            <c:when test="${empty mList}">
                                <li class="no-data">
                                    <p>아직 등록된 메모가 없습니다. <br>오른쪽 위의 + 버튼을 눌러 업무를 관리해보세요!</p>
                                </li>
                            </c:when>
                        </c:choose>
                    </ul>
                    <button class="btn--plus" type="button"></button>
                </section>
            </div>
        </article>
    </div>

    <script src="../../../resources/js/todo.js"></script>
</body>

</html>