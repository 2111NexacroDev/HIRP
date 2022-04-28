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
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
                <div class="todo__wrap">
                    <section class="todo--today">
                        <h2>TODAY</h2>
                        <ul>
                        	<c:forEach items="${tList }" var="todo">
                            <li>
                                <input id="todo${todo.todoNo }" type="checkbox">
                                <label for="todo${todo.todoNo }"></label>
                                <input name="" type="text" value="${todo.todoConts }">
                            </li>
                            </c:forEach>
                            <li>
                                <input id="todo2" type="checkbox">
                                <label for="todo2"></label>
                                <input name="" type="text" value="">
                            </li>
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
                          <li><textarea name="memo${memo.memoNo }">${memo.memoConts}</textarea></li>
                        </c:forEach>
                        <li><textarea></textarea></li>
                    </ul>
                    <button class="btn--plus" type="button"></button>
                </section>
            </div>
        </article>
    </div>
</body>

</html>