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
			<form id="addSurveyInfoForm" action="/survey/addSurveyInfo.hirp", method="get">
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
			                    <div class="">
				                    <input id="valueB" class="mt-20" name="surveyObject" type="radio" value="직접선택">
					                <label for="valueB">직접 선택</label><br>
					                
					                <div class="bor-dashed mt-20 padding-20" style="width:500px">
					                	<!-- 응답자 리스트 담기는 div -->
					                	<div id="emplListDiv"> 
<!-- 					                		<div style="display:none;" class="basic-border bor-round padding-10 inline-block-div mb-10"> -->
<!-- 					                			밍선 -->
<!-- 					                			삭제 버튼 -->
<!-- 					                			<button type="button" class="noneBackground none-padding ml-10" onclick="removeEmplDiv(this);"><i class="fa-solid fa-xmark"></i></button>  -->
<!-- 					                			<input type="hidden" name="surveyObjectIdList" value=""> -->
<!-- 					                		</div> -->
<!-- 					                		<div class="basic-border bor-round padding-10 inline-block-div mb-10"> -->
<!-- 					                			진실 -->
<!-- 					                			삭제 버튼 -->
<!-- 					                			<button type="button" class="noneBackground none-padding ml-10" onclick=""><i class="fa-solid fa-xmark"></i></button>  -->
<!-- 					                			<input type="hidden" name="surveyObjectIdList" value="id2"> -->
<!-- 					                		</div> -->
<!-- 					                		<div class="basic-border bor-round padding-10 inline-block-div mb-10"> -->
<!-- 					                			민수 -->
<!-- 					                			삭제 버튼 -->
<!-- 					                			<button type="button" class="noneBackground none-padding ml-10" onclick=""><i class="fa-solid fa-xmark"></i></button>  -->
<!-- 					                			<input type="hidden" name="surveyObjectIdList" value="id3"> -->
<!-- 					                		</div> -->
					                	</div>
					                    <button class="noneBackground" type="button" onclick="onAddEmplButton(this);"><i class="fa-solid fa-plus"></i> 추가</button>&nbsp;
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
	                                <button class="finished closeWindow" type="button" onclick="cleanEmplSearchKeyword();">취소</button>
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
			
			//검색 input창 초기화
			function cleanEmplSearchKeyword(){
				var emplSearchKeyword = $("[name='emplSearchKeyword']").val(); //검색창에 입력한 값
				emplSearchKeyword = ""; //값 비워지지가 않는다...!
			}
			
			//응답자 목록 삭제
			function removeEmplDiv(obj){
				var emplDiv = $(obj).parent();
				console.log(emplDiv);
				emplDiv.remove();
			}
			
			//응답자 목록 추가
			function addEmplDiv(arr){
				console.log("addEmplDiv");
				console.log(arr); //부서, 직급, 이름, 부서코드, 직급코드, 아이디 순
				var $emplListDiv = $("#emplListDiv"); //응답 대상자 목록을 감싸고 있는 div
				var $surveyObjectListInput = $emplListDiv.find("[name='surveyObjectIdList']"); //이미 추가된 id값 담겨있는 input 태그 (hidden)
				console.log(emplListDiv);
				console.log($surveyObjectListInput);
				console.log($surveyObjectListInput.eq(0)); //input 태그 중에 첫번째
				
				var objectCount = $surveyObjectListInput.length; //input 태그 갯수
				console.log("갯수:"+objectCount);
				if(objectCount == 0){
					console.log("인풋이 없다");
					var emplDivHtml = "<div class='basic-border bor-round padding-10 inline-block-div mr-5 mb-5'>"
		    			+arr[2]
		    			+"<button type='button' class='noneBackground none-padding ml-10' onclick='removeEmplDiv(this);'><i class='fa-solid fa-xmark'></i></button>"
		    			+"<input type='hidden' name='surveyObjectIdList' value='"+arr[5]+"'>"
		    		+ "</div>"
		    		$emplListDiv.append(emplDivHtml);
				} else {
					for(var i = 0 ; i < objectCount ; i++){
						if($surveyObjectListInput.eq(i).val() != arr[5]){ //아이디값이 같은 input이 없을 때
	// 						console.log($surveyObjectListInput.eq(0).val());
	// 						console.log(arr[5]);
	// 						console.log("없다!");
							if(i == objectCount-1){ //아이디값이 같은 input이 없었고 마지막 인덱스일 때
								var emplDivHtml = "<div class='basic-border bor-round padding-10 inline-block-div mr-5 mb-5'>"
					    			+arr[2]
					    			+"<button type='button' class='noneBackground none-padding ml-10' onclick='removeEmplDiv(this);'><i class='fa-solid fa-xmark'></i></button>"
					    			+"<input type='hidden' name='surveyObjectIdList' value='"+arr[5]+"'>"
					    		+ "</div>"
					    		$emplListDiv.append(emplDivHtml);
							} else {
								continue;
							}
						} else { //아이디값이 같은 input이 있으먼 추가 안됨.
	// 						console.log("있다!");
							break;
						}
					}
					
				}
				
				
			}
			
			//응답자 목록에서 검색 (ajax)
			function emplSearch(){
				var emplSearchKeyword = $("[name='emplSearchKeyword']").val(); //검색창에 입력한 값
				console.log(emplSearchKeyword);
				
				$.ajax({
					url:"/survey/searchEmplList.hirp",
					type:"post",
					data:{"emplSearchKeyword" : emplSearchKeyword},
					success: function(eList){
						console.log("성공");
	        			console.log(eList);
	        			var count = eList.length;
	        			
	        			var $tableBody = $("#emplTable tbody");
	        			$tableBody.html("");//기존 내용 있으면 비우기
	        			
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
	        		error: function(){ //왜 정렬이 가운데로 안되는지 모르겠군
	        			console.log("실패");
						var $tableBody = $("#emplTable tbody");
	        			$tableBody.html("");//기존 내용 있으면 비우기
	        			var $tr = $("<tr>");
	        			var $text = $("<div class='t-c' style='align:center;'>").html("검색 결과가 없습니다."); //이거 td 안 합쳐짐.
						$tr.append($text);
						$tableBody.append($tr);
	        		}
				});
			}
			
			
			//tr이 클릭될 때
			function emplTrClick(e){
				var str = ""
				var tdArr = new Array();	// 배열 선언
				
				// 현재 클릭된 Row(<tr>)
				var tr = $(e);
				var td = tr.children();
				
				// tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
				console.log("클릭한 Row의 모든 데이터 : "+tr.text());
				
				// 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
				td.each(function(i){
					tdArr.push(td.eq(i).text());
				});
				
				console.log("배열에 담긴 값 : "+tdArr);
				

				var hiddenDeptCode = tr.next();
				var hiddenPositionCode = tr.next().next();
				var hiddenEmplId = tr.next().next().next();
				console.log(hiddenDeptCode.val());
				console.log(hiddenPositionCode.val());
				console.log(hiddenEmplId.val());
				
				tdArr.push(hiddenDeptCode.val());
				tdArr.push(hiddenPositionCode.val());
				tdArr.push(hiddenEmplId.val());
				
				addEmplDiv(tdArr);
			}
			
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