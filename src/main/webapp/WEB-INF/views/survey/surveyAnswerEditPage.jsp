<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- 설문조사 응답 페이지 (상세1) -->
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

        <h1 class="basic-border-bottom">설문 상세</h1>
        <!-- 메인 상단 끝 -->
        <c:if test="${surveyInfo.surveyStatus eq 'C'}">
        	<!-- 진행 중인 게시글일 때 -->
        	<c:url var="sList" value="/survey/proceed.hirp"></c:url>
        </c:if> 
        <c:if test="${surveyInfo.surveyStatus eq 'F'}">
        	<!-- 마감된 게시글일 때 --> <!-- 아직 마감된 게시글은 상세 연결 안되어있음. -->
        	<c:url var="sList" value="/survey/closed.hirp"></c:url>
        </c:if> 
       	<!-- 설문조사 정보 수정 페이지 -->
       	<c:url var="sInfoUpdate" value="/survey/updateSurveyPage.hirp">
                <c:param name="surveyNo" value="${surveyInfo.surveyNo }"></c:param>
        </c:url>
		<!-- 설문조사 상태 업데이트 (마감) -->
        <c:url var="sStatusUpdate" value="/survey/updateStatus.hirp">
            <c:param name="surveyNo" value="${surveyInfo.surveyNo }"></c:param>
        </c:url>
		<!-- 설문조사 삭제 -->
        <c:url var="sDelete" value="/survey/deleteSurvey.hirp">
            <c:param name="surveyNo" value="${surveyInfo.surveyNo }"></c:param>
        </c:url>
            
        <c:if test="${surveyInfo.surveyWriter eq sessionScope.emplId }">
	       	<div class="padding-10 basic-border-bottom" style="height:50px">
	            <form action='${sInfoUpdate}' method="post">
	       			<button class="noneBackground"><i class="fa-solid fa-pen-to-square"></i> 수정</button>&nbsp;
	            </form>
	            <form action='${sStatusUpdate}' method="post">
	                <button class="noneBackground" type="submit"><i class="fa-regular fa-clock"></i> 마감</button>&nbsp;
	            </form>
	            <form action='${sDelete}' method="post">
	                <button class="noneBackground" type="submit"><i class="fa-regular fa-trash-can"></i> 삭제</button>&nbsp;
	            </form>
	       		<button style="float:right;" class="h2--list" onclick="location.href='${sList}'"> 목록 </button>&nbsp;
	       	</div>
       	</c:if>
        <c:if test="${surveyInfo.surveyWriter ne sessionScope.emplId }">
        	<button style="float:right;" class="h2--list mt-20" onclick="location.href='${sList}'"> 목록 </button>&nbsp;
        </c:if>
        <!-- 페이지 내용 -->
        <div id="" class="subConts">
            <!-- 설문 정보 -->
            <h2 class="mb-20">${surveyInfo.surveyTitle}</h2>
            <p class="mb-10">작성자: ${surveyInfo.surveyWriter}</p>
            <p class="mb-10">작성일 : ${surveyInfo.surveyDate}</p>
            <p class="mb-10">설문 기간 : ${fn:substring(surveyInfo.surveyStartdate, 0, 10) } ~ ${fn:substring(surveyInfo.surveyEnddate, 0, 10) }</p>
            <p class="mb-10">참여 후 수정 : 
            	<c:if test="${surveyInfo.surveyEdit eq 'Y'}">
            		허용
            	</c:if>
            	<c:if test="${surveyInfo.surveyEdit eq 'N'}">
            		비허용
            	</c:if>
            </p>
            <p class="mb-10">설문 결과 : 
            	<c:if test="${surveyInfo.surveyResult eq 'Y'}">
            		공개
            	</c:if>
            	<c:if test="${surveyInfo.surveyResult eq 'N'}">
            		비공개
            	</c:if>
            </p>
            <!-- 응답자 정보 -->
            <div class="row mt-20">
                <div class=" basic-border bor-round ml-10 mr-10 padding-10">
                    <div class="">전체 대상자</div>
                    <div class="contents-strong padding-top-10">${subAllCount}</div>
                </div>
                <div class="basic-border bor-round mr-10 padding-10">
                    <div>참여완료</div>
                    <div class="contents-strong padding-top-10">${answerSubCount}</div>
                </div>
                <div class="basic-border bor-round mr-10 padding-10">
                    <div>미참여</div>
                    <div class="contents-strong padding-top-10">${subAllCount - answerSubCount}</div>
                </div>
            </div>
            <br>
            <!--시작 안내 문구-->
            <div class="row mt-20 padding-20 bc-grey">
                ${surveyInfo.surveyStartcomment}
            </div>
            <br>
            <div id="questListDiv">
	           	<form id="updateAnswerForm" action="/survey/updateAnswer.hirp" method="POST">
		            <!--문항 시작-->
		            <!--문항 div -> 문항 제목 p태그 + 내용 담는 div -> 내용 담는 div 안에 유형에 맞게 다른 내용 들어감.-->
		            <c:forEach items="${questList }" var="questInfo" varStatus="status">
		           		<input type="hidden" name="surveyNo" value="${surveyInfo.surveyNo }">
		           		<input type="hidden" name="surveyquestNo" value="${questInfo.questNo }">
		           		<c:forEach items="${myAnswerList }" var="answer">
                       		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
                            	<input type="hidden" name="surveyanswerNo" value="${answer.surveyanswerNo }">
                       		</c:if>
                        </c:forEach>
		                <c:if test="${questInfo.questType1 eq 'C' && questInfo.questType2 eq '하나만 선택' || questInfo.questType1 eq 'D' && questInfo.questType2 eq '하나만 선택'}">
		                    <div class="mt-20 mb-20">
		                        <!--객관식 하나만 선택-->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh1}">
		                            	<c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${answer.surveyanswerContent eq '1'}">
					                                <div class="mb-10">
					                                    <input id="valueA" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="1" checked="checked">
					                                    <label for="valueA">${questInfo.surveyQuestCh.surveyCh1}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${answer.surveyanswerContent ne '1'}">
					                                <div class="mb-10">
					                                    <input id="valueA" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="1">
					                                    <label for="valueA">${questInfo.surveyQuestCh.surveyCh1}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh2}">
		                            	<c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${answer.surveyanswerContent eq '2'}">
					                                <div class="mb-10">
					                                    <input id="valueB" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="2" checked="checked">
		                                    			<label for="valueB">${questInfo.surveyQuestCh.surveyCh2}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${answer.surveyanswerContent ne '2'}">
					                                <div class="mb-10">
					                                    <input id="valueB" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="2">
		                                    			<label for="valueB">${questInfo.surveyQuestCh.surveyCh2}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh3}">
		                            	<c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${answer.surveyanswerContent eq '3'}">
					                                <div class="mb-10">
					                                    <input id="valueC" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="3" checked="checked">
		                                    			<label for="valueC">${questInfo.surveyQuestCh.surveyCh3}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${answer.surveyanswerContent ne '3'}">
					                                <div class="mb-10">
					                                    <input id="valueC" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="3">
		                                    			<label for="valueC">${questInfo.surveyQuestCh.surveyCh3}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh4}">
		                                <c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${answer.surveyanswerContent eq '4'}">
					                                <div class="mb-10">
					                                    <input id="valueD" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="4" checked="checked">
		                                    			<label for="valueD">${questInfo.surveyQuestCh.surveyCh4}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${answer.surveyanswerContent ne '4'}">
					                                <div class="mb-10">
					                                    <input id="valueD" class="mt-20" name="surveyanswerContent${status.count }" type="radio" value="4">
		                                    			<label for="valueD">${questInfo.surveyQuestCh.surveyCh4}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'C' && questInfo.questType2 eq '복수 선택'|| questInfo.questType1 eq 'D' && questInfo.questType2 eq '복수 선택'}">
		                    <div class="mt-20 mb-20">
		                        <!--객관식 중복 선택 가능-->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh1}">
		                                <c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${fn:contains(answer.surveyanswerContent, '1')}">
					                                <div class="mb-10">
					                                    <input id="check1" name="surveyanswerContent" class="mt-20" type="checkbox" value="1" checked="checked">
		                                    			<label for="check1">${questInfo.surveyQuestCh.surveyCh1}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${not fn:contains(answer.surveyanswerContent, '1')}">
					                                <div class="mb-10">
					                                    <input id="check1" name="surveyanswerContent" class="mt-20" type="checkbox" value="1">
		                                    			<label for="check1">${questInfo.surveyQuestCh.surveyCh1}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh2}">
		                                <c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${fn:contains(answer.surveyanswerContent, '2')}">
					                                <div class="mb-10">
					                                    <input id="check2" name="surveyanswerContent" class="mt-20" type="checkbox" value="2" checked="checked">
		                                    			<label for="check2">${questInfo.surveyQuestCh.surveyCh2}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${not fn:contains(answer.surveyanswerContent, '2')}">
					                                <div class="mb-10">
					                                    <input id="check2" name="surveyanswerContent" class="mt-20" type="checkbox" value="2">
		                                    			<label for="check2">${questInfo.surveyQuestCh.surveyCh2}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh3}">
		                            	<c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${fn:contains(answer.surveyanswerContent, '3')}">
					                                <div class="mb-10">
					                                    <input id="check3" name="surveyanswerContent" class="mt-20" type="checkbox" value="3" checked="checked">
		                                    			<label for="check3">${questInfo.surveyQuestCh.surveyCh3}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${not fn:contains(answer.surveyanswerContent, '3')}">
					                                <div class="mb-10">
					                                    <input id="check3" name="surveyanswerContent" class="mt-20" type="checkbox" value="3">
		                                    			<label for="check3">${questInfo.surveyQuestCh.surveyCh3}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh4}">
		                                <c:forEach items="${myAnswerList }" var="answer">
		                            		<c:if test="${answer.surveyquestNo eq questInfo.questNo}">
				                                <c:if test="${fn:contains(answer.surveyanswerContent, '4')}">
					                                <div class="mb-10">
					                                    <input id="check4" name="surveyanswerContent" class="mt-20" type="checkbox" value="4" checked="checked">
		                                    			<label for="check4">${questInfo.surveyQuestCh.surveyCh4}</label><br>
					                                </div>
		                            			</c:if>
		                            			<c:if test="${not fn:contains(answer.surveyanswerContent, '4')}">
					                                <div class="mb-10">
					                                    <input id="check4" name="surveyanswerContent" class="mt-20" type="checkbox" value="4">
		                                    			<label for="check4">${questInfo.surveyQuestCh.surveyCh4}</label><br>
					                                </div>
		                            			</c:if>
		                            		</c:if>
		                            	</c:forEach>
		                            </c:if>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'T' && questInfo.questType2 eq '단문 입력'}">
		                    <div class="mt-20 mb-20">
		                        <!--주관식 단문형 -->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                            <input type="text" name="surveyanswerContent" class="" style="width:90%" placeholder="답안 입력" value="${myAnswerList[status.count-1].surveyanswerContent }">
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'T' && questInfo.questType2 eq '장문 입력'}">
		                    <div class="mt-20 mb-20">
		                        <!--주관식 장문형 -->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                            <textarea name="surveyanswerContent" id="" style="width:90%" cols="20" rows="3" placeholder="답안 입력">${myAnswerList[status.count-1].surveyanswerContent }</textarea>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
	            	
		            </c:forEach>
	           	</form>
            </div>
            
            <!--문항 끝-->
            <br>
            <!-- 설문 제출 / 취소 버튼 -->
            <div class="t-c">
                <button class="point mt-20" type="button" onclick="openAlert(this);">응답 수정 제출</button>
                <section class="section--alert">
                    <div class="bg-black"></div>
                    <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                    <div class="section--alert__conts">
                        <button class="btn--close" type="button"></button>
                        <p>
                            설문 응답을 제출하시겠습니까?
                        </p>
                        <div class="btns-wrap mt-20">
                            <button class="point" type="button" onclick="questSubmit(this)">확인</button>
                            <button class="finished closeWindow" type="button">닫기</button>
                        </div>
                    </div>
                </section>
                <!-- 다음 버튼 눌렀을 때 설문조사 작성할 건지 한번 더 물어보는 창 띄우기
                    뒤로가기 안되게 -->
                &nbsp;&nbsp;&nbsp;
                <button class="basic mt-20" type="button"  onclick="location.href='${sList}'">취소</button>
            </div>
        </div>
        <!-- 페이지 내용 끝 -->
        
    </article>
	<script>	
		function questSubmit(e){
			var buttonDiv = $(e).parent().parent().parent().parent(); //div t-c
			console.log(buttonDiv);
			var $formDiv = buttonDiv.prev().prev().children(); //문항들 감싸고 있는 div
			console.log($formDiv);
			var $answerDiv = $formDiv.children("div");
			console.log($answerDiv);
			var aCount = $answerDiv.length; //문항 div 태그 갯수
			console.log(aCount);
    		for(var i = 0; i < aCount ; i++) {
    			//no 넘겨주는 input 태그 name값 바꿔주기
    			var $surveyNoInput = $answerDiv.eq(i).prev().prev().prev();
    			$surveyNoInput.attr('name', 'surveyAnswerList['+(i)+'].surveyNo');
    			var $questNoInput = $answerDiv.eq(i).prev().prev();
    			$questNoInput.attr('name', 'surveyAnswerList['+(i)+'].surveyquestNo');
    			var $surveyanswerNoInput = $answerDiv.eq(i).prev();
    			$surveyanswerNoInput.attr('name', 'surveyAnswerList['+(i)+'].surveyanswerNo');
//     			console.log($surveyNoInput);
//     			console.log($questNoInput);
				//답안 name값 바꿔주기
//         		var $answerContent = $answerDiv.eq(i).find("[name=surveyanswerContent]"); //name값 같으면 radio 한가지로 인식되어서
				var $answerContent = $answerDiv.eq(i).find("input"); //input 태그 조회 (radio로 조회하면 텍스트형 조회 안됨.)
				console.log($answerContent);
				$answerContent.attr('name', 'surveyAnswerList['+(i)+'].surveyanswerContent'); //속성값 바꿔주기
    		}
			document.getElementById('updateAnswerForm').submit();
		}
	</script>
</body>
</html>