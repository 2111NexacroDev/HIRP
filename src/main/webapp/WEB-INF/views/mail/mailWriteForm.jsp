<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/project.css">

<!-- textarea 에디터 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
	
	<div id="conts">
        <aside id="snb">
            <h1>메일</h1>
            <a class="btn--function" href="/mail/writeView.hirp">메일쓰기</a>

            <ul class="ul--mail">
<<<<<<< HEAD
               <li>
                   <a href="#none">메일함</a>
                   <ul>
                       <li <c:if test="${mailCategory == 'R' }">class="on"</c:if>><a href="/mail/Rlist.hirp">받은메일함</a></li>
                       <li <c:if test="${mailCategory == 'S' }">class="on"</c:if>><a href="/mail/Slist.hirp">보낸메일함</a></li>
                       <li <c:if test="${mailCategory == 'T' }">class="on"</c:if>><a href="/mail/Tlist.hirp">임시보관함</a></li>
                       <li <c:if test="${mailCategory == 'M' }">class="on"</c:if>><a href="/mail/Mlist.hirp">내게쓴메일함</a></li>
                       <li <c:if test="${mailCategory == 'I' }">class="on"</c:if>><a href="/mail/Ilist.hirp">중요메일함</a></li>
                       <li <c:if test="${mailCategory == 'W' }">class="on"</c:if>><a href="/mail/Wlist.hirp">휴지통</a><button class="basic" type="button" onclick="deleteAllMail();">비우기</button></li>
                   </ul>
               </li>
            </ul>
=======
				<li>
					<a href="#none">메일함</a>
					<ul>
						<li <c:if test="${mailCategory == 'R' }">class="on"</c:if>><a href="/mail/Rlist.hirp">받은메일함</a></li>
						<li <c:if test="${mailCategory == 'S' }">class="on"</c:if>><a href="/mail/Slist.hirp">보낸메일함</a></li>
						<li <c:if test="${mailCategory == 'T' }">class="on"</c:if>><a href="/mail/Tlist.hirp">임시보관함</a></li>
						<li <c:if test="${mailCategory == 'M' }">class="on"</c:if>><a href="/mail/Mlist.hirp">내게쓴메일함</a></li>
						<li <c:if test="${mailCategory == 'I' }">class="on"</c:if>><a href="/mail/Ilist.hirp">중요메일함</a></li>
						<li <c:if test="${mailCategory == 'W' }">class="on"</c:if>><a href="/mail/Wlist.hirp">휴지통</a><button class="basic" type="button" onclick="deleteAllMail();">비우기</button></li>
					</ul>
				</li>
			 </ul>
>>>>>>> refs/remotes/origin/main
            
            <a class="btn--function bugReport" href="/bugReport/WriteView.hirp">
				<img src="../../../resources/images/icons/icon_bugreport.png" alt="icon">
				버그리포트 작성
			</a>
		</aside>

        <article id="sub" class="">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<h1 class="basic-border-bottom">
				메일쓰기
            </h1>
            <div id="mailWrite" class="subConts padding-0">
            	<form action="/mail/send.hirp" method="post" enctype="multipart/form-data">
<<<<<<< HEAD
		            <button class="basic mt-20" type="submit">보내기</button>
		            <button class="basic mt-20" type="button" onclick="temporaryStorage();">임시저장</button>
	            	<h4>받는사람</h4>
	            	<!-- 체크박스 선택하면 로그인 유저 아이디 나와야 함 -->
	            	<input id="check1" class="mt-20" type="checkbox" name="check1" onclick="myMail();">
	            	<label for="check1">나에게</label>
	            	<input type="text" name="mailRecipient" id="mailRecipient">
	            	<button class="basic mt-20" type="button" onclick="onAddEmplButton(this);">주소록</button>
					<section class="section--modal modal--chat modal--recipient">
						<div class="section--modal__conts" style="border: none">
							<button class="btn--close" type="button"></button>
							<h3>받는 사람</h3>
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
	            	<br>
	            	<h4>참조</h4>
	            	<input type="text" name="mailReferrer" id="mailReferrer">
	            	<button class="basic mt-20" type="button" onclick="onAddEmplButtonRef(this);">주소록</button>
	            	<section class="section--modal modal--chat modal--referrer">
						<div class="section--modal__conts" style="border: none">
							<button class="btn--close" type="button"></button>
							<h3>참조</h3>
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
											<tr onclick="emplTrClickRef(this);">
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
	            	<br>
	            	<h4>제목</h4>
	            	<input type="text" name="mailTitle"><br>
	            	<h4>파일첨부</h4>
	            	<input type="file" size="50" name="uploadFile" value="파일선택">
=======
					<div class="btns-wrap mt-20">						
						<button class="basic" type="submit">보내기</button>
						<button class="basic" type="button" onclick="temporaryStorage();">임시저장</button>
					</div>
					<ul class="ul--mailWrite mt-10 mb-10 padding-20">
						<li>
							<div class="d-flex align-items-center">
								<h4>받는사람</h4>							
								<!-- 체크박스 선택하면 로그인 유저 아이디 나와야 함 -->
								<input id="check1" class="mt-20" type="checkbox" name="check1" onclick="myMail();">
								<label for="check1">나에게</label>
							</div>
							<div>
								<input type="text" name="mailRecipient" id="mailRecipient">
								<button class="basic" type="button">주소록</button>
							</div>
						</li>
						<li>
							<h4>참조</h4>
							<div>
								<input type="text" name="mailReferrer">
								<button class="basic" type="button">주소록</button>
							</div>
						</li>
						<li>
							<h4>제목</h4>
							<input type="text" name="mailTitle">
						</li>
						<li>
							<h4>파일첨부</h4>
							<input type="file" size="50" name="uploadFile" value="파일선택">
						</li>
					</ul>
>>>>>>> refs/remotes/origin/main
	            	<textarea id="summernote" rows="" cols="" name="mailContents"></textarea>
            	</form>
	        </div>
        </article>
	</div>
	<script>
		function openModal(modalWindow) {
		    $(modalWindow).siblings('.modal--recipient').css('display', 'flex');
		}
		
		function openModal2(modalWindow) {
		    $(modalWindow).siblings('.modal--referrer').css('display', 'flex');
		}
		
		// 나에게
		function myMail() {
			var uid = '<%=(String)session.getAttribute("emplId")%>';
			if($("#check1").prop("checked")) {
<<<<<<< HEAD
				$("#mailRecipient").val(uid+"@hirp.com");
=======
				$("#mailRecipient").val("${sessionScope.emplId}");
>>>>>>> refs/remotes/origin/main
			}else {
				$("#mailRecipient").val("");
			}
		}
		
		//수신자 추가 버튼
		function onAddEmplButton(e){
			openModal(e);
			//본인 소속팀과 하위 부서 check 해제
			$("#subjectRadio2").prop("checked", true);
			$("#subDeptCheck").prop("checked", false);
		}
		
		// 참조자 추가 버튼
		function onAddEmplButtonRef(e){
			openModal2(e);
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
		
		//수신 주소록 tr이 클릭될 때
		function emplTrClick(e) {
 			var tdArr = new Array();
			
 			var tr = $(e);
 			var td = tr.children();
			
			td.each(function(i){
				tdArr.push(td.eq(i).text());
 			});
			
 			var hiddenEmplId = tr.next().next().next();
			
 			tdArr.push(hiddenEmplId.val());
			
 			$("#mailRecipient").val(tdArr[3]+'@hirp.com');
		}
		
		// 참조 주소록 tr이 클릭될 때
		function emplTrClickRef(e) {
			var tdArr = new Array();
			
 			var tr = $(e);
 			var td = tr.children();
			
			td.each(function(i){
				tdArr.push(td.eq(i).text());
 			});
			
 			var hiddenEmplId = tr.next().next().next();
			
 			tdArr.push(hiddenEmplId.val());
			
 			$("#mailReferrer").val(tdArr[3]+'@hirp.com');
		}
	</script>
	<script src="../../../resources/js/mail.js"></script>
</body>
</html>