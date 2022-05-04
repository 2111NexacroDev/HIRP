<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css">

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

            <ul>
               <li>
                   <a href="">프로젝트관리</a>
                   <ul>
                       <li><a href="/project/list.hirp">프로젝트 보기</a></li>
                   </ul>
               </li>
            </ul>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				프로젝트 만들기
            </h1>
            <div class="subConts">
	            <form action="/project/register.hirp" method="post">
		        	<div id="project">
			        	<table class="table--basic mt-20" style="margin-top: 40px;">
				            <tr>
				                <td>프로젝트명</td>
				                <td><input type="text" style="width:300px;border:0 solid black;" placeholder="프로젝트명" name="projectName"></td>
				            </tr>
				            <tr>
				                <td>담당자</td>
				                <td><input type="text" style="width:300px;border:0 solid black;" placeholder="name" name="projectManager"><button class="basic mt-20" type="button">찾기</button></td>
				            </tr>
				            <tr>
				                <td>일자</td>
				                <td><input type="date" name="startDate">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" name="endDate"></td>
				            </tr>
			            </table>
			            <div class="t-c" id="btn">
			                <button class="point mt-20" type="submit" id="btnSubmit">등록</button>
			                <button class="basic mt-20" type="reset" id="btnCancel">취소</button>
		                </div>
		            </div>
		        </form>
	        </div>
        </article>
	</div>
</body>
</html>