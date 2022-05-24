<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->
<script src="https://kit.fontawesome.com/08c05a1f0f.js" crossorigin="anonymous"></script> <!-- fontawesome -->
<link rel="stylesheet" href="../../../resources/css/common.css">
<link rel="stylesheet" href="../../../resources/css/chat.css">
<header id="cnb">
    <nav>
        <ul>
            <li><a href="chatMain.hirp"></a></li> <!-- 직원 -->
            <li><a href="chatroomList.hirp"></a></li> <!-- 채팅 -->
            <li><a href=""></a></li> <!-- 첨부파일 저장 -->
        </ul>
        <ul class="chat-icon-2" style="position: absolute; bottom: 0; left: 0;">
            <li><a href=""></a></li> <!-- 알림 버튼, 해제할 때 아이콘 바뀌게 해야함. -->
            <li><a href=""></a></li> <!-- 설정 버튼 -->
        </ul>
    </nav>
</header>