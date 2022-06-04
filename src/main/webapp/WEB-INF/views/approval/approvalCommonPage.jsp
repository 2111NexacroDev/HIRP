<!DOCTYPE html>
<html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HIRP</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap"
        rel="stylesheet"><!-- 노토산스 코리안 서체 CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/main.min.js"></script>

    <link rel="stylesheet" href="../../resources/css/reset.css"><!-- 브라우저 기본 스타일 리셋하는 CSS -->
    <link rel="stylesheet" href="../../resources/css/common.css"><!-- 하이알피 공통 스타일(header, input, select, ...) CSS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script
        src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"
        integrity="sha256-eTyxS0rkjpLEo16uXTS0uVCS4815lc40K2iVpWDvdSY="
        crossorigin="anonymous"></script>
    <script src="../../resources/js/common.js"></script>
	<!-- 하이알피 서브페이지 CSS -->
	<link rel="stylesheet" href="../../../resources/css/sub.css">
	<!-- editor -->
	<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
	<!--fontawesome  -->
	<script src="https://kit.fontawesome.com/b1c70be712.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="../../resources/css/approval.css?afte"><!-- approval css -->

<!-- 조직도 -->
<script src="../../../resources/js/jquery.treeview.js"></script>
<link rel="stylesheet" href="../../../resources/css/jquery.treeview.css" />
<link rel="stylesheet" href="../../../resources/css/screen.css" />

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
		                            <ul id="apprFormListUl">
		                            
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
                        <li><a href="/waiting/appr.hirp">결재문서함</a></li>
                    </ul>
                </li>
                 <li>
                    <a href="">기안문서함</a>
                    <ul>       
                        <li><a href="/written/appr.hirp">상신문서함</a></li>
                        <li><a href="/temporaryStorage/appr.hirp">임시저장함</a></li>
                        <li><a href="/rejected/appr.hirp">반려문서함</a></li>
                        <li><a href="/completed/appr.hirp">결재완료함</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">참조함</a>
                    <ul>       
                        <li><a href="/ref/appr.hirp">참조문서함</a></li>
                        <li><a href="/viewer/appr.hirp">열람문서함</a></li>
                    </ul>
                </li>
            </ul>
        </aside>
        <article id="sub" class="">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
            
            <script>
            function openModal(modalWindow) {
                $(modalWindow).siblings('.section--modal').css('display', 'flex');
               
            }
            
            getFormList();
            
            function getFormList() {
    		 $.ajax({
    				url  : "/apprForm/list.hirp",
    				type : "get",
    				dataType : "json",
    				success : function(data) { 
    					var apprFormListUl = $("#apprFormListUl");
    					 for(var i = 0; i < data.length; i++) {
    						var apprList = "<c:url var='fDetail' value='/approvalForm/detail.hirp?formNo="+data[i].formNo+"'></c:url><li><a href='${fDetail }'>"+data[i].formTitle+"</li>"
    						apprFormListUl.append(apprList);
    					} 
    					
    				},
    				error   : function() { 
    					alert("조회실패");
    				}
    			});
    			
    		}
             
            </script>
