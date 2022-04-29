<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>
                프로젝트 관리
            </h1>
            <a class="btn--function" href="/project/writeView.hirp">프로젝트 만들기</a>

            	프로젝트관리<br>
            	프로젝트 보기
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				프로젝트 보기
            </h1>
            
        	<table class="table--basic mt-20" style="margin-top: 40px;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>프로젝트명</th>
                            <th>시작일</th>
                            <th>종료일</th>
                            <th>담당자(ID)</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<c:forEach items="${pList }" var="project">
	                        <tr>
	                            <td>${project.projectNo }</td>
	                            <c:url var="pDetail" value="/project/detail.hirp">
									<c:param name="projectNo" value="${project.projectNo }"></c:param>
								</c:url>
	                            <td><a href="${pDetail}">${project.projectName }</a></td>
	                            <td>${project.startDate }</td>
	                            <td>${project.endDate }</td>
	                            <td>${project.projectManager }</td>
	                        </tr>
                        </c:forEach>
                    </tbody>
                </table>
                <button class="basic mt-20">이전</button>
                <c:forEach var="p" begin="${pi.startNavi }" end="${pi.endNavi }">
                	<c:url var="pagination" value="/project/list.hirp">
                		<c:param name="page" value="${p }"></c:param>
                	</c:url>
                	&nbsp;<a href="${pagination }">${p }</a>&nbsp;
                </c:forEach>
                <button class="basic mt-20">다음</button>
        </article>
	</div>
</body>
</html>