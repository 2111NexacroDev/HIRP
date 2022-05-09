<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%
	Date today = new Date();
    Date tomorrow = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 ) );
    Date after2days = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 * 2 ) );
    Date after3days = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 * 3 ) );
    Date after4days = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 * 4 ) );
    Date after5days = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 * 5 ) );
    Date after6days = new Date ( today.getTime ( ) + (long) ( 1000 * 60 * 60 * 24 * 6 ) );
	SimpleDateFormat sf = new SimpleDateFormat("yyyy년 MM월 dd일");
    SimpleDateFormat sf2 = new SimpleDateFormat("yyyy-MM-dd");
%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <aside id="snb">
            <h1>개인업무관리</h1>
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
                    <section class="todo--week">
                        <h2>WEEK</h2>
                        <ul>
                            <li><a href="/todo/list.hirp?date=<%=sf2.format(today)%>"><%=sf.format(today)%></a></li>
                            <li><a href="/todo/list.hirp?date=<%=sf2.format(tomorrow)%>"><%=sf.format(tomorrow)%></a>
                            </li>
                            <li><a
                                    href="/todo/list.hirp?date=<%=sf2.format(after2days)%>"><%=sf.format(after2days)%></a>
                            </li>
                            <li><a
                                    href="/todo/list.hirp?date=<%=sf2.format(after3days)%>"><%=sf.format(after3days)%></a>
                            </li>
                            <li><a
                                    href="/todo/list.hirp?date=<%=sf2.format(after4days)%>"><%=sf.format(after4days)%></a>
                            </li>
                            <li><a
                                    href="/todo/list.hirp?date=<%=sf2.format(after5days)%>"><%=sf.format(after5days)%></a>
                            </li>
                            <li><a
                                    href="/todo/list.hirp?date=<%=sf2.format(after6days)%>"><%=sf.format(after6days)%></a>
                            </li>
                        </ul>
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