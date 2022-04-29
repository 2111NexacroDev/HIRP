<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css?after">

<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
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
            
            <form action="/project/detail.hirp" method="get">
            	프로젝트정보
            	<button type="button" onclick="location.href='/project/remove.hirp'">삭제</button>
            	<button>수정</button>
            	<button><a href="/project/list.hirp">목록</a></button>
            	<table class="table--basic mt-20" style="margin-top: 40px;">
		            <tr>
		                <td>프로젝트명</td>
		                <td>${project.projectName }</td>
		            </tr>
		            <tr>
		                <td>담당자(PM)</td>
		                <td>${project.projectManager }</td>
		            </tr>
		            <tr>
		                <td>일자</td>
		                <td>${project.startDate }&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;${project.endDate }</td>
		            </tr>
	            </table>
	            
            	칸반보드보기
            	<div class="row mt-20">
					<h4 class="col mb-20"></h4>
					<div class="col">
					    <div>진행사항없음()<button id="bSubmit">추가</button></div>
					</div>
					<div class="col">
					    <div>시작 전()<button id="bSubmit">추가</button></div>
					</div>
					<div class="col">
					    <div>진행 중()<button id="bSubmit">추가</button></div>
					</div>
					<div class="col">
					    <div>완료()<button id="bSubmit">추가</button></div>
					</div>
					<div class="col">
					    <div>중지()<button id="bSubmit">추가</button></div>
					</div>
				</div>
            	<div class="row mt-20">
					<h4 class="col mb-20"></h4>
					<div class="col">
					    <div>칸</div>
					</div>
					<div class="col">
					    <div>칸</div>
					</div>
					<div class="col">
					    <div>칸</div>
					</div>
					<div class="col">
					    <div>칸</div>
					</div>
					<div class="col">
					    <div>칸</div>
					</div>
				</div>
            	
            	프로젝트진행률
            	<div class="progress-bar">
            		<div class="progress"></div>
            	</div>
            	진행률 %
            	<table class="table--basic mt-20" style="margin-top: 40px;">
		            <thead>
                        <tr>
                            <th>진행상태</th>
                            <th>갯수</th>
                        </tr>
                    </thead>
                    <tbody>
			            <tr>
			                <td>진행상태없음</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td>시작 전</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td>진행 중</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td>완료</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td>중지</td>
			                <td></td>
			            </tr>
		            </tbody>
	            </table>
            </form>
		</article>
	</div>
	<script>
		getBoardList();
		$("#bSubmit").on("click", function() {
			var refProjectNo = "${project.projectNo}";
			var bContents = $("#bContents").val();
			$.ajax({
				url : "/"
			});
		});
		$(function() {
    		$(".modal_btn").click(function() {
    			$(".modal").fadeIn();
    		});
    		$(".modal_closeBtn").click(function() {
    			$(".modal").fadeOut();
    		});
    	});
	</script>
</body>
</html>