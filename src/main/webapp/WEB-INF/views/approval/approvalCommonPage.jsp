<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/sub.css">
<!-- editor -->
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

<head>
<meta charset="UTF-8">
<!--fontawesome  -->
<script src="https://kit.fontawesome.com/b1c70be712.js" crossorigin="anonymous"></script>
</head>
<body>
 <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <aside id="snb">
            <h1>전자결재</h1>
            <a class="btn--function" class="basic" type="button" onclick="openModal(this);">새 결재 진행</a>
                    <section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts">
                            <button class="btn--close"></button>
                            <h3>결재양식 선택</h3>
                            <p class="mb-20">
                               <div>
		                            <div class="bor-round shadow" id="formListDiv" style="width: 250px; height:180px;">
		                            <ul>
		                            <c:forEach var="form" items="${formList }" >
		                            	<c:url var="fDetail" value="/approvalForm/detail.hirp">
		                            		<c:param name="formNo" value="${form.formNo }"></c:param>
		                            	</c:url>
									<li><a href="${fDetail }">${form.formTitle }</a></li>
		                            </c:forEach>
		                            </ul>
		                            </div>
                      		  </div>
                            </p>
                           <div >
                           </div>
                            <div class="btns-wrap mt-20 t-r">
                                <!-- <button class="point" type="button">확인</button> -->
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
            <ul>
                <li>
                    <a href="">결재하기</a>
                    <ul>
                        <li><a href="/wating/appr.hirp">결재문서함</a></li>
                    </ul>
                </li>
                 <li>
                    <a href="">기안문서함</a>
                    <ul>       
                        <li><a href="#">상신문서함</a></li>
                        <li><a href="#">임시문서함</a></li>
                        <li><a href="#">반려문서함</a></li>
                        <li><a href="#">결재완료함</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">참조함</a>
                    <ul>       
                        <li><a href="#">참조문서함</a></li>
                        <li><a href="#">열람문서함</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub" class="">
       
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

           
</body>
</html>