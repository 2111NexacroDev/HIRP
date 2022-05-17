<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<header id="gnb">
    <button type="button" id="gnb__btn--burger"></button>
    <h1 id="gnb__logo">
        <a href="/home.hirp">
            <img src="../resources/images/logo_hirp.png" alt="HIRP">
        </a>
    </h1>
    <nav>
        <ul>
            <li><a href="/home.hirp">홈</a></li>
            <li><a href="/mail/list.hirp">메일</a></li>
            <li><a href="/board/main.hirp">게시판</a></li>
            <li><a href="/todo/list.hirp">개인업무관리</a></li>
            <li><a href="/project/list.hirp">프로젝트관리</a></li>
            <li><a href="/schedule/list.hirp">일정관리</a></li>
            <li><a href="/approval/main.hirp">전자결재</a></li>
            <li><a href="/survey/main.hirp">설문조사</a></li>
            <li><a href="/time/timeListView.hirp">근태관리</a></li>
            <li><a href="/reservation/list.hirp">공용품 예약/관리</a></li>
        </ul>
        <button type="button" id="gnb__btn--org" onclick="location.href='/group/groupView.hirp'">조직도</button>
    </nav>
</header>

