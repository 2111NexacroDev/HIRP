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
				프로젝트 보기
            </h1>
            <div class="subConts">
	            <form action="/project/detail.hirp" method="get">
	            <div class="basic-border mt-20 padding-20">
	            	<h3>프로젝트정보</h3>
	            	<div class="t-r">
		            	<button class="basic" type="button" onclick="openAlert(this);">삭제</button>
		            	<section class="section--alert">
		                        <div class="bg-black"></div>
		                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
		                        <div class="section--alert__conts">
		                            <button type="button" class="btn--close"></button>
		                            <p>
		                                확인을 누르시면<br>
		                                프로젝트 삭제가 진행됩니다. 삭제하시겠습니까?
		                            </p>
		                            <div class="btns-wrap mt-20">
		                                <button class="point" type="button" onclick="location.href='/project/remove.hirp?projectNo=${project.projectNo }'">확인</button>
		                                <button class="finished closeWindow" type="button">닫기</button>
		                            </div>
		                        </div>
		                    </section>
		            	<button class="basic" type="button" onclick="openModal(this);">수정</button>
		                    <section class="section--modal">
		                        <div class="section--modal__conts">
		                            <button type="button" class="btn--close"></button>
		                            <h3>프로젝트 정보수정</h3>
		                            <ul>
		                                <li>
		                                    <label for="">프로젝트명</label><input type="text" id="projectName" name="projectName" value="${project.projectName }">
		                                </li>
		                                <li>
		                                    <label for="">담당자(PM)</label><input type="text" id="projectManager" name="projectManager" value="${project.projectManager }">
		                                </li>
		                                <li>
		                                    <label for="">일자</label><input type="date" id="startDate" name="startDate" value="${project.startDate }">&nbsp;&nbsp;~&nbsp;&nbsp;<input type="date" id="endDate" name="endDate" value="${project.endDate }">
		                                </li>
		                            </ul>
		                            <div class="btns-wrap mt-20 t-r">
		                                <button class="point" type="button" onclick="updateBtn();">확인</button>
		                                <button class="finished closeWindow" type="button">닫기</button>
		                            </div>
		                        </div>
		                    </section>
		            	<button class="basic"><a href="/project/list.hirp">목록</a></button>
	            	</div>
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
	            </div>
		            
		            <div class="basic-border mt-20 padding-20">
		            	<h3>칸반보드보기</h3>
		            	<div class="row mt-20">
							<div class="col">
							    <div class="basic-border mt-20 padding-20">
							    	<div class="basic-border mt-20 padding-20">
								    	<h3>진행사항없음()</h3><button class="btn--plus" type="button" onclick="openModal(this);">추가</button>
										    <section class="section--modal">
						                        <div class="section--modal__conts">
						                            <button type="button" class="btn--close"></button>
						                            <h3>칸반보드 추가</h3>
						                            <ul>
						                                <li>
						                                    <label for="">담당자</label><input type="text" id="pManager" name="projectManager" value="${project.projectManager }">
						                                </li>
						                                <li>
						                                    <label for="">내용</label><input type="text" id="bContents" name="boardContents">
						                                </li>
						                            </ul>
					                                <input type="hidden" id="bStatus" value="0">
						                            <div class="btns-wrap mt-20 t-r">
						                                <button class="point" type="button" id="bSubmit" onclick="updateBtn();">추가</button>
						                                <button class="finished closeWindow" type="button">닫기</button>
						                            </div>
						                        </div>
						                    </section>
					                   </div>
					                   <div class="basic-border mt-20 padding-20 KanbanCard">
					                   </div>
				                    </div>
								</div>
							<div class="col">
							    <div class="basic-border mt-20 padding-20">
							    	<div class="basic-border mt-20 padding-20">
								    	<h3>시작 전()</h3><button class="btn--plus" type="button" onclick="openModal(this);">추가</button>
										    <section class="section--modal">
						                        <div class="section--modal__conts">
						                            <button type="button" class="btn--close"></button>
						                            <h3>칸반보드 추가</h3>
						                            <ul>
						                                <li>
						                                    <label for="">담당자</label><input type="text" id="projectManager" name="projectManager" value="${project.projectManager }">
						                                </li>
						                                <li>
						                                    <label for="">내용</label><input type="text" id="boardContent" name="boardContent">
						                                </li>
						                            </ul>
						                            <div class="btns-wrap mt-20 t-r">
						                                <button class="point" type="button" id="bSubmit" onclick="updateBtn();">추가</button>
						                                <button class="finished closeWindow" type="button">닫기</button>
						                            </div>
						                        </div>
						                    </section>
					                   </div>
					                   <div class="basic-border mt-20 padding-20 KanbanCard">
					                   </div>
				                    </div>
								</div>
							<div class="col">
							    <div class="basic-border mt-20 padding-20">
							    	<div class="basic-border mt-20 padding-20">
								    	<h3>진행 중()</h3><button class="btn--plus" type="button" onclick="openModal(this);">추가</button>
										    <section class="section--modal">
						                        <div class="section--modal__conts">
						                            <button type="button" class="btn--close"></button>
						                            <h3>칸반보드 추가</h3>
						                            <ul>
						                                <li>
						                                    <label for="">담당자</label><input type="text" id="projectManager" name="projectManager" value="${project.projectManager }">
						                                </li>
						                                <li>
						                                    <label for="">내용</label><input type="text" id="boardContent" name="boardContent">
						                                </li>
						                            </ul>
						                            <div class="btns-wrap mt-20 t-r">
						                                <button class="point" type="button" id="bSubmit" onclick="updateBtn();">추가</button>
						                                <button class="finished closeWindow" type="button">닫기</button>
						                            </div>
						                        </div>
						                    </section>
					                   </div>
					                   <div class="basic-border mt-20 padding-20 KanbanCard">
					                   </div>
				                    </div>
								</div>
							<div class="col">
							    <div class="basic-border mt-20 padding-20">
							    	<div class="basic-border mt-20 padding-20">
								    	<h3>완료()</h3><button class="btn--plus" type="button" onclick="openModal(this);">추가</button>
										    <section class="section--modal">
						                        <div class="section--modal__conts">
						                            <button type="button" class="btn--close"></button>
						                            <h3>칸반보드 추가</h3>
						                            <ul>
						                                <li>
						                                    <label for="">담당자</label><input type="text" id="projectManager" name="projectManager" value="${project.projectManager }">
						                                </li>
						                                <li>
						                                    <label for="">내용</label><input type="text" id="boardContent" name="boardContent">
						                                </li>
						                            </ul>
						                            <div class="btns-wrap mt-20 t-r">
						                                <button class="point" type="button" id="bSubmit" onclick="updateBtn();">추가</button>
						                                <button class="finished closeWindow" type="button">닫기</button>
						                            </div>
						                        </div>
						                    </section>
					                   </div>
					                   <div class="basic-border mt-20 padding-20 KanbanCard">
					                   </div>
				                    </div>
								</div>
							<div class="col">
							    <div class="basic-border mt-20 padding-20">
							    	<div class="basic-border mt-20 padding-20">
								    	<h3>중지()</h3><button class="btn--plus" type="button" onclick="openModal(this);">추가</button>
										    <section class="section--modal">
						                        <div class="section--modal__conts">
						                            <button type="button" class="btn--close"></button>
						                            <h3>칸반보드 추가</h3>
						                            <ul>
						                                <li>
						                                    <label for="">담당자</label><input type="text" id="projectManager" name="projectManager" value="${project.projectManager }">
						                                </li>
						                                <li>
						                                    <label for="">내용</label><input type="text" id="boardContent" name="boardContent">
						                                </li>
						                            </ul>
						                            <div class="btns-wrap mt-20 t-r">
						                                <button class="point" type="button" id="bSubmit" onclick="updateBtn();">추가</button>
						                                <button class="finished closeWindow" type="button">닫기</button>
						                            </div>
						                        </div>
						                    </section>
					                   </div>
					                   <div class="basic-border mt-20 padding-20 KanbanCard">
					                   </div>
				                    </div>
								</div>
							</div>
	            		</div>
	            	
	            	<div class="basic-border mt-20 padding-20">
		            	<h3>프로젝트진행률</h3>
		            	<div class="progress-bar">
		            		<div class="progress"></div>
		            	</div>
		            	<h3>진행률 %</h3>
		<!--             	계산식 {(완료)+0.5*(진행중)/(전체-중지)}*100 -->
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
		            </div>
	            </form>
           	</div>
		</article>
	</div>
	<script>
		function updateBtn() {
			var projectNo = '${project.projectNo }';
			var projectName = document.getElementById('projectName').value;
			var projectManager = document.getElementById('projectManager').value;
			var startDate = document.getElementById('startDate').value;
			var endDate = document.getElementById('endDate').value;
			location.href = '/project/modify.hirp?projectNo='+projectNo+'&projectName='+projectName+'&projectManager='+projectManager+'&startDate='+startDate+'&endDate='+endDate;
		}
		
		var cards = document.getElementsByClassName("KanbanCard");
		for(var i in cards) {
			dragElements(cards[i]);
		}
		
		function dragElements(elmnt) {
			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			elmnt.onmousedown = dragMouseDown;
		
			function dragMouseDown(e) {
				e = e || window.event;
				e.preventDefault();
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}
			
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
			
			function closeDragElement()	{
				document.onmouseup = null;
				document.onmousemove = null;
				alert(elmnt.style.top + "," + elmnt.style.left)
			}
		}
		
		$(document).ready(function() {
			getBoardList();
			$("#bSubmit").on("click", function() {
				var pNo = "${project.projectNo}";
				var pManager = $("#pManager").val();
				var bContents = $("#bContents").val();
				var bStatus = $("#bStatus").val();
				$.ajax({
					url : "/project/boardAdd.hirp",
					type : "post",
					data : {"pNo" : pNo, "pManager" : pManager, "bContents" : bContents, "bStatus" : bStatus},
					success : function(data) {
						location.href="/project/detail.hirp";
					},
					error : function() {
						alert("ajax 실패!");
					}
				});
			});
		});

































	</script>
</body>
</html>