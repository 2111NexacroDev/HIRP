<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<header id="gnb">
    <button type="button" id="gnb__btn--burger"></button>
    <h1 id="gnb__logo">
        <a href="/">
            <img src="../resources/images/logo_hirp.png" alt="HIRP">
        </a>
    </h1>
    <nav>
        <ul>
            <li><a href="/" class="on">홈</a></li>
            <li><a href="#">메일</a></li>
            <li><a href="#">게시판</a></li>
            <li><a href="/todo/list.hirp">개인업무관리</a></li>
            <li><a href="#">프로젝트관리</a></li>
            <li><a href="/schedule/list.hirp">일정관리</a></li>
            <li><a href="#">전자결재</a></li>
            <li><a href="#">설문조사</a></li>
            <li><a href="/time/list.hirp">근태관리</a></li>
            <li><a href="#">공용품 예약/관리</a></li>
        </ul>
        <button type="button" id="gnb__btn--org">조직도</button>
    </nav>
</header>