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
       	<!-- 내가 작성한 게시글일 때 뜨는 버튼들 -->
       	<div class="padding-10 basic-border-bottom"">
       		<c:if test=""></c:if> <!-- 내가 작성한 설문조사일 때 다 보이고, 진행중인 것만 마감 버튼 보여주기 -->
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
            <!-- 버튼즈 -->
            <form action='${sInfoUpdate}' method="post">
       			<button class="noneBackground"><i class="fa-solid fa-pen-to-square"></i> 수정</button>&nbsp;
            </form>
            <form action='${sStatusUpdate}' method="post">
                <button class="noneBackground" type="submit"><i class="fa-regular fa-clock"></i>  마감</button>&nbsp;
            </form>
            <form action='${sDelete}' method="post">
                <button class="noneBackground" type="submit"><i class="fa-regular fa-trash-can"></i> 삭제</button>&nbsp;
            </form>
       		<button style="float:right;" class="h2--list" onclick="location.href='${sList}'"> 목록 </button>&nbsp;
       	</div>
        
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
	           	<form id="addAnswerForm" action="/survey/addSurveyAnswer.hirp" method="POST">
		            <!--문항 시작-->
		            <!--문항 div -> 문항 제목 p태그 + 내용 담는 div -> 내용 담는 div 안에 유형에 맞게 다른 내용 들어감.-->
		            <c:forEach items="${questList }" var="questInfo" varStatus="status">
		           		<input type="hidden" name="surveyNo" value="${surveyInfo.surveyNo }">
		           		<input type="hidden" name="surveyquestNo" value="${questInfo.questNo }">
		           		<!-- 변수 선언 -->
		           		<c:set var="questAnswerCount" value="0"/> <!-- 해당 문항에 응답한 사람 수 -->
		           		<c:set var="surveyCh1Count" value="0"/> <!-- 1번에 답한 사람 수 (객관식) -->
		           		<c:set var="surveyCh2Count" value="0"/>
		           		<c:set var="surveyCh3Count" value="0"/>
		           		<c:set var="surveyCh4Count" value="0"/>
		           		<!-- 해당 문항에 응답한 사람 수 세기 -->
		           		<c:forEach items="${answerList }" var="answer">
		           			<c:if test="${answer.surveyquestNo eq questInfo.questNo && answer.surveyanswerContent ne null}">
				           			<c:set var="questAnswerCount" value="${questAnswerCount+1 }"/>
		           			</c:if>
		           		</c:forEach>
		           		
		                <c:if test="${questInfo.questType1 eq 'C' && questInfo.questType2 eq '하나만 선택' || questInfo.questType1 eq 'D' && questInfo.questType2 eq '하나만 선택'}">
		                    <!-- 답변한 사람, 보기별 답변 갯수 카운트 -->
		                    <c:forEach items="${answerList }" var="answer">
			           			<c:if test="${answer.surveyquestNo eq questInfo.questNo && answer.surveyanswerContent ne null}">
					           			<c:if test="${answer.surveyanswerContent eq '1' }">
					           				<c:set var="surveyCh1Count" value="${surveyCh1Count+1 }"/>
					           			</c:if>
					           			<c:if test="${answer.surveyanswerContent eq '2' }">
					           				<c:set var="surveyCh2Count" value="${surveyCh2Count+1 }"/>
					           			</c:if>
					           			<c:if test="${answer.surveyanswerContent eq '3' }">
					           				<c:set var="surveyCh3Count" value="${surveyCh3Count+1 }"/>
					           			</c:if>
					           			<c:if test="${answer.surveyanswerContent eq '4' }">
					           				<c:set var="surveyCh4Count" value="${surveyCh4Count+1 }"/>
					           			</c:if>
			           			</c:if>
			           		</c:forEach>
		           		
		                    <div class="mt-20 mb-20">
<%-- 		                        <p>${questInfo.questNo }</p> --%>
		                        <!--객관식 하나만 선택-->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                            <div class="basic-border bor-round padding-20 mb-20 row" style="width: 60%;">
		                            	<div class="inline-block-div col-6">전체 대상자 : ${subAllCount}명</div>
		                            	<div class="inline-block-div col-6">참여율 : ${questAnswerCount}명 (<fmt:formatNumber type="percent" value="${questAnswerCount/subAllCount }" pattern="0.00%" />)</div>
		                            </div>
		                            <table class="table--basic" style="width: 60%">
					                    <thead>
					                        <tr>
					                            <th>보기</th>
					                            <th>응답자 수</th>
					                            <th>응답 비율</th>
					                        </tr>
					                    </thead>
					                    <tbody>
					                    	<c:if test="${not empty questInfo.surveyQuestCh.surveyCh1}">
					                    		
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh1}</td>
						                            <td>${surveyCh1Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh1Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
				                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh2}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh2}</td>
						                            <td>${surveyCh2Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh2Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
				                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh3}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh3}</td>
						                            <td>${surveyCh3Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh3Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
					                    	<c:if test="${not empty questInfo.surveyQuestCh.surveyCh4}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh4}</td>
						                            <td>${surveyCh4Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh4Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
					                    </tbody>
				                    </table>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'C' && questInfo.questType2 eq '복수 선택'|| questInfo.questType1 eq 'D' && questInfo.questType2 eq '복수 선택'}">
		                    <c:forEach items="${answerList }" var="answer">
			           			<c:if test="${answer.surveyquestNo eq questInfo.questNo && answer.surveyanswerContent ne null}">
					           			<c:if test="${fn:contains(answer.surveyanswerContent, '1')}">
					           				<c:set var="surveyCh1Count" value="${surveyCh1Count+1 }"/>
					           			</c:if>
					           			<c:if test="${fn:contains(answer.surveyanswerContent, '2')}">
					           				<c:set var="surveyCh2Count" value="${surveyCh2Count+1 }"/>
					           			</c:if>
					           			<c:if test="${fn:contains(answer.surveyanswerContent, '3')}">
					           				<c:set var="surveyCh3Count" value="${surveyCh3Count+1 }"/>
					           			</c:if>
					           			<c:if test="${fn:contains(answer.surveyanswerContent, '4')}">
					           				<c:set var="surveyCh4Count" value="${surveyCh4Count+1 }"/>
					           			</c:if>
			           			</c:if>
			           		</c:forEach>
		                    
		                    <div class="mt-20 mb-20">
		                        <!--객관식 중복 선택 가능-->
<%-- 		                    	<p>${questInfo.questNo }</p> --%>
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                        	<div class="basic-border bor-round padding-20 mb-20 row" style="width: 60%;">
		                            	<div class="inline-block-div col-6">전체 대상자 : ${subAllCount}명</div>
		                            	<div class="inline-block-div col-6">참여율 : ${questAnswerCount}명 (<fmt:formatNumber type="percent" value="${questAnswerCount/subAllCount }" pattern="0.00%" />)</div>
		                            	
		                            </div>
		                            <table class="table--basic" style="width: 60%">
					                    <thead>
					                        <tr>
					                            <th>보기</th>
					                            <th>응답자 수</th>
					                            <th>응답 비율</th>
					                        </tr>
					                    </thead>
					                    <tbody>
					                    	<c:if test="${not empty questInfo.surveyQuestCh.surveyCh1}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh1}</td>
						                            <td>${surveyCh1Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh1Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
				                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh2}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh2}</td>
						                            <td>${surveyCh2Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh2Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
				                            <c:if test="${not empty questInfo.surveyQuestCh.surveyCh3}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh3}</td>
						                            <td>${surveyCh3Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh3Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
					                    	<c:if test="${not empty questInfo.surveyQuestCh.surveyCh4}">
				                                <tr>
						                            <td>${questInfo.surveyQuestCh.surveyCh4}</td>
						                            <td>${surveyCh4Count }</td>
						                            <td>
						                            	<c:if test="${questAnswerCount ne '0'}">
							                            	<fmt:formatNumber type="percent" value="${surveyCh4Count/questAnswerCount }" pattern="0.00%" />
						                            	</c:if>
						                            	<c:if test="${questAnswerCount eq '0'}">
						                            		0.00%
						                            	</c:if>
						                            </td>
						                        </tr>
				                            </c:if>
					                    </tbody>
				                    </table>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'T' && questInfo.questType2 eq '단문 입력'}">
		                	
		                    <div class="mt-20 mb-20">
<%-- 		                   		<p>${questInfo.questNo }</p> --%>
		                        <!--주관식 단문형 -->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                        	<div class="basic-border bor-round padding-20 mb-20 row" style="width: 60%;">
		                            	<div class="inline-block-div col-6">전체 대상자 : ${subAllCount}명</div>
		                            	<div class="inline-block-div col-6">참여율 : ${questAnswerCount}명 (<fmt:formatNumber type="percent" value="${questAnswerCount/subAllCount }" pattern="0.00%" />)</div>
		                            </div>
		                            <!-- 답변 출력 -->
		                            <c:forEach items="${answerList }" var="answer">
					           			<c:if test="${answer.surveyquestNo eq questInfo.questNo && answer.surveyanswerContent ne null}">
				                        	<p class="mt-10 mb-10">${answer.surveyanswerContent }</p>
					           			</c:if>
					           		</c:forEach>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
		                <c:if test="${questInfo.questType1 eq 'T' && questInfo.questType2 eq '장문 입력'}">
		                    <div class="mt-20 mb-20">
<%-- 		                    <p>${questInfo.questNo }</p> --%>
		                        <!--주관식 장문형 -->
		                        <p class="mb-10 contents-strong">${status.count}. ${questInfo.questTitle}</p>
		                        <div class="mt-20 ml-20">
		                        	<div class="basic-border bor-round padding-20 mb-20 row" style="width: 60%;">
		                            	<div class="inline-block-div col-6">전체 대상자 : ${subAllCount}명</div>
		                            	<div class="inline-block-div col-6">참여율 : ${questAnswerCount}명 (<fmt:formatNumber type="percent" value="${questAnswerCount/subAllCount }" pattern="0.00%" />)</div>
		                            </div>
		                            <!-- 답변 출력 -->
		                            <c:forEach items="${answerList }" var="answer">
					           			<c:if test="${answer.surveyquestNo eq questInfo.questNo && answer.surveyanswerContent ne null}">
				                        	<p class="mt-10 mb-10">${answer.surveyanswerContent }</p>
					           			</c:if>
					           		</c:forEach>
		                        </div>
		                    </div>
		                    <br>
		                </c:if>
	            	
		            </c:forEach>
	           	</form>
            </div>
            
            <!--문항 끝-->
            <br><br><br><br>
            
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
    			var $surveyNoInput = $answerDiv.eq(i).prev().prev();
    			$surveyNoInput.attr('name', 'surveyAnswerList['+(i)+'].surveyNo');
    			var $questNoInput = $answerDiv.eq(i).prev();
    			$questNoInput.attr('name', 'surveyAnswerList['+(i)+'].surveyquestNo');
//     			console.log($surveyNoInput);
//     			console.log($questNoInput);
				//답안 name값 바꿔주기
        		var $answerContent = $answerDiv.eq(i).find("[name=surveyanswerContent]"); //질문 div 밑에 있는 애들 중에서 id questTitle인 애 찾기
				console.log($answerContent);
				$answerContent.attr('name', 'surveyAnswerList['+(i)+'].surveyanswerContent'); //속성값 바꿔주기
    		}
			document.getElementById('addAnswerForm').submit();
		}
	</script>
</body>
</html>