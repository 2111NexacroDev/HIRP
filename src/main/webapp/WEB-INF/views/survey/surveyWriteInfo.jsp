<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- 설문조사 정보 추가 페이지 (survey) -->
<body>
	<!-- survey 공통 -->
	<%@ include file="/WEB-INF/views/survey/surveyCommonPage.jsp" %>
        
        <!-- 우측 메인 -->
        <article id="sub" class="">
        	<!-- 메인 상단 -->
        	<!-- 우측 상단 바로가기 메뉴 -->
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<!-- 검색폼 필요한 사람 쓰기, class 변경 안하고 id만 부여해서 사용하면 됨 -->
            <form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>
			<form action="/survey/addSurveyInfo.hirp", method="get">
				<h1 class="basic-border-bottom">설문 작성</h1>
	            <!-- 메인 상단 끝 -->
	            
	            <!-- 페이지 내용 -->
	            <div id="" class="subConts padding-0">
	            	<!-- 마지막 선 넣어준 div... -->
	            	<div class="basic-border-bottom padding-20">
		            	<div class="row mt-20">
			                <div class="col-3">
			                    <div>설문 제목</div>
			                </div>
			                <div class="">
			                    <input type="text" size="50" name="surveyTitle" placeholder="설문조사 제목 입력">
			                </div>
			            </div>
			            <div class="row mt-20">
			                <div class="col-3">
			                    <div>설문 기간</div>
			                </div>
			                <div class="">
			                    <input class="" type="date" name="surveyStartdate"> ~ <input class="" type="date" name="surveyEnddate">
			                </div>
			            </div>
			            <div class="row mt-20">
			                <div class="col-3">
			                    <div>설문 대상자</div>
			                </div>
			                <div class="">
			                	<!-- 본인 소속 부서 사람들 선택 -->
			                    <div class="mb-20">
			                    	<input id="valueA" class="" name="surveyObject" type="radio" value="본인소속" checked="checked">
					                <label for="valueA">본인 소속 팀</label>&nbsp;
					                (
					                	<input id="check1" class="" type="checkbox" checked="checked">
			               	 			<label for="check1">하위 부서</label>
					                )
					                <br>
			                    </div>
			                    <!-- 직접 선택 -->
			                    <div>
				                    <input id="valueB" class="mt-20" name="surveyObject" type="radio" value="직접선택">
					                <label for="valueB">직접 선택</label><br>
					                
					                <div class="bor-dashed mt-20 padding-20">
					                    <button class="noneBackground" type="button" onclick="onAddEmplButton(this);"><i class="fa-solid fa-plus"></i> 추가</button>&nbsp;
										<section class="section--modal modal--chat">
											<div class="section--modal__conts" style="border: none">
												<button class="btn--close" type="button"></button>
												<h3>직원 선택</h3>
												<div class="mb-20">
													<ul>
														<li>
															<input type="text" name="" size="25" placeholder="부서명 또는 사원명 검색">
															<button class="point" type="button">검색</button>
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
																<tr >
																	<td>${empl.deptName}</td>
																	<td>${empl.positionName}</td>
																	<td>${empl.emplName}</td>
																</tr>
															</c:forEach>
														</tbody>
													</table>
												</div>
												<div class="btns-wrap mt-20 t-r">
													<button class="point" type="button">확인</button>
													<button class="finished closeWindow" type="button">닫기</button>
												</div>
											</div>
										</section>
					                    <button class="colorGrey" type="button"><i class="fa-regular fa-trash-can"></i> 전체 삭제</button>
					                </div>
			                    </div>
				                
			                </div>
			            </div>
			            <div class="row mt-20">
			                <div class="col-3">
			                    <div>설문 결과 공개</div>
			                </div>
			                <div class="">
			                    <!-- 체크박스랑 래디오 쓸 때 라벨 꼭 데리고 다니기, id와 for는 같아야함 -->
				                <input id="valueA" class="" name="surveyResult" type="radio" value="Y" checked="checked">
				                <label for="valueA">공개</label>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				                <input id="valueB" class="" name="surveyResult" type="radio" value="N">
				                <label for="valueB">비공개</label><br>
			                </div>
			            </div>
			            <div class="row mt-20 mb-20">
			                <div class="col-3">
			                    <div>참여 후 수정 허용</div>
			                </div>
			                <div class="">
			                	<!-- 체크박스랑 래디오 쓸 때 라벨 꼭 데리고 다니기, id와 for는 같아야함 -->
				                <input id="valueA" class="" name="surveyEdit" type="radio" value="Y" checked="checked">
				                <label for="valueA">허용</label>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				                <input id="valueB" class="" name="surveyEdit" type="radio" value="N">
				                <label for="valueB">비허용</label><br>
			                </div>
			            </div>
			            
		            </div>
		            <!-- 마지막 선 넣어준 div 끝... -->
		            <div class="t-c">
			            <button class="point mt-20" type="button" onclick="onNextButton(this);">다음</button>
			            <section class="section--modal">
	                        <div class="bg-black"></div>
	                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
	                        <div class="section--modal__conts" style="width:400px;">
	                            <button class="btn--close" type="button"></button>
	                            <h3 align="left">설문조사 작성</h3>
	                            <p class="mb-20 padding-bottom">
	                                확인을 누르면 설문조사 등록을 완료할 때까지<br>
	                                입력한 정보를 수정할 수 없습니다.<br>
	                                설문조사 정보 등록을 완료하시겠습니까?<br>
	                            </p>
	                            <div class="btns-wrap mt-20 t-r">
	                                <button class="point" type="submit">확인</button>
	                                <button class="finished closeWindow" type="button">취소</button>
	                            </div>
	                        </div>
	                    </section>
			            <!-- 다음 버튼 눌렀을 때 설문조사 작성할 건지 한번 더 물어보는 창 띄우기
			            	뒤로가기 안되게 -->
			            &nbsp;&nbsp;&nbsp;
			            <button class="basic mt-20" type="button">취소</button>
		            </div>
	            </div>
	            <!-- 페이지 내용 끝 -->
            
			</form>
			
        </article>
        
        <script>
        	function onNextButton(e){
        		openModal(e);
        	}

			function onAddEmplButton(e){
				openModal(e);
			}
			
			//테이블 tr 클릭해서 직원 데이터 가져오기
			$("#emplTable tr").click(function(){ 	

				var str = ""
				var tdArr = new Array();	// 배열 선언
				
				// 현재 클릭된 Row(<tr>)
				var tr = $(this);
				var td = tr.children();
				
				// tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
				console.log("클릭한 Row의 모든 데이터 : "+tr.text());
				
				// 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
				td.each(function(i){
					tdArr.push(td.eq(i).text());
				});
				
				console.log("배열에 담긴 값 : "+tdArr);
				
				// td.eq(index)를 통해 값을 가져올 수도 있다.
				var no = td.eq(0).text();
				var userid = td.eq(1).text();
				var name = td.eq(2).text();
				var email = td.eq(3).text();
				
				
// 				str +=	" * 클릭된 Row의 td값 = No. : <font color='red'>" + no + "</font>" +
// 						", 아이디 : <font color='red'>" + userid + "</font>" +
// 						", 이름 : <font color='red'>" + name + "</font>" +
// 						", 이메일 : <font color='red'>" + email + "</font>";		
				
// 				$("#ex1_Result1").html(" * 클릭한 Row의 모든 데이터 = " + tr.text());		
// 				$("#ex1_Result2").html(str);
			});
			
			//설문 대상자 라디오버튼
			//본인소속, 직접선택
			$("input[name=surveyObject]").change(function(){
				if($(this).val() == "직접선택"){
					$("#check1").prop("checked", false);
				}
			});
			
        </script>
</body>
</html>