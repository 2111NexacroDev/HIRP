<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css">
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>프로젝트 관리</h1>
            <a class="btn--function" href="/project/writeView.hirp">프로젝트 만들기</a>

            <ul>
               <li>
                   <a href="#none">프로젝트관리</a>
                   <ul>
                       <li class="on"><a href="/project/list.hirp">프로젝트 보기</a></li>
                   </ul>
               </li>
            </ul>
        </aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				프로젝트 만들기
            </h1>
            <div id="projectWrite" class="subConts">
	            <form action="/project/register.hirp" method="post">
		        	<div id="project">
			        	<table class="table--basic mt-20" style="margin-top: 40px;">
				            <tr>
				                <td>프로젝트명</td>
				                <td><input type="text" style="width:300px;" placeholder="프로젝트명" name="projectName"></td>
				            </tr>
				            <tr>
				                <td>담당자</td>
				                <td>
					                <input type="text" style="width:300px;" placeholder="name" name="projectManager" id="projectManager">
					                <button class="basic ml-10" type="button" onclick="onAddEmplButton(this);">찾기</button>
									<section class="section--modal modal--chat">
										<div class="section--modal__conts" style="border: none">
											<button class="btn--close" type="button"></button>
											<h3>직원 선택</h3>
											<div class="mb-20">
												<ul>
													<li>
														<input type="text" name="emplSearchKeyword" size="25" placeholder="부서명 또는 사원명 검색">
														<button class="point" type="button" onclick="emplSearch();">검색</button>
													</li>
												</ul>
												<table class="table--basic mt-20" id="emplTable">
													<thead>
														<tr>
															<th>부서</th>
															<th>직급</th>
															<th>이름</th>
														</tr>
													</thead>
													<tbody>
														<c:forEach items="${emplList }" var="empl">
															<tr onclick="emplTrClick(this);">
																<td>${empl.deptName}</td>
																<td>${empl.positionName}</td>
																<td>${empl.emplName}</td>
															</tr>
															<input type="hidden" name="deptCode" value="${empl.deptCode }">
															<input type="hidden" name="positionCode" value="${empl.positionCode }">
															<input type="hidden" name="emplId" value="${empl.emplId }">
														</c:forEach>
													</tbody>
												</table>
											</div>
											<div class="btns-wrap mt-20 t-r">
												<button class="finished closeWindow" type="button">닫기</button>
											</div>
										</div>
									</section>
				                </td>
				            </tr>
				            <tr>
				                <td>일자</td>
				                <td>
				                	<input type="date" name="startDate">
				                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				                	<input type="date" name="endDate">
			                	</td>
				            </tr>
			            </table>
			            <div class="btns-wrap t-c" id="btn">
			                <button class="point" type="submit" id="btnSubmit">등록</button>
			                <button class="basic" type="reset" id="btnCancel" onclick="location.href='/project/list.hirp'">취소</button>
		                </div>
		            </div>
		        </form>
	        </div>
        </article>
	</div>
	<script>
		//응답자 추가 버튼
		function onAddEmplButton(e){
			openModal(e);
			//본인 소속팀과 하위 부서 check 해제
			$("#subjectRadio2").prop("checked", true);
			$("#subDeptCheck").prop("checked", false);
		}
		
		//응답자 목록에서 검색 (ajax)
		function emplSearch(){
			var emplSearchKeyword = $("[name='emplSearchKeyword']").val();
			
			$.ajax({
				url:"/searchEmplList.hirp",
				type:"post",
				data:{"emplSearchKeyword" : emplSearchKeyword},
				success: function(eList){
	    			var count = eList.length;
	    			
	    			var $tableBody = $("#emplTable tbody");
	    			$tableBody.html("");
	    			
	    			for(var i=0; i<count; i++){
	        			var $tr = $("<tr onclick='emplTrClick(this);'>");
	        			var $tdDept = $("<td>").html(eList[i].deptName);
	        			var $tdPosition = $("<td>").html(eList[i].positionName);
	        			var $tdName = $("<td>").html(eList[i].emplName);
						$tr.append($tdDept);
						$tr.append($tdPosition);
						$tr.append($tdName);
						$tableBody.append($tr);
						
						var hiddenDeptCode = "<input type='hidden' name='deptCode' value="+eList[i].deptCode+">"
						var hiddenPositionCode = "<input type='hidden' name='positionCode' value="+eList[i].positionCode+">"
						var hiddenEmplId = "<input type='hidden' name='emplId' value="+eList[i].emplId+">"
						$tableBody.append(hiddenDeptCode);
						$tableBody.append(hiddenPositionCode);
						$tableBody.append(hiddenEmplId);
					}
	    			
	    		},
	    		error: function(){
					var $tableBody = $("#emplTable tbody");
	    			$tableBody.html("");
	    			var $tr = $("<tr>");
	    			var $text = $("<div class='t-c' style='align:center;'>").html("검색 결과가 없습니다.");
					$tr.append($text);
					$tableBody.append($tr);
	    		}
			});
		}
		
		//tr이 클릭될 때
		function emplTrClick(e) {
 			var tdArr = new Array();
			
 			var tr = $(e);
 			var td = tr.children();
			
			td.each(function(i){
				tdArr.push(td.eq(i).text());
 			});
			
 			var hiddenEmplId = tr.next().next().next();
			
 			tdArr.push(hiddenEmplId.val());
			
 			$("#projectManager").val(tdArr[3]);
		}
	</script>
</body>
</html>