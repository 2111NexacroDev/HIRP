<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
<h1 class="basic-border-bottom">문서함</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
			<c:if test="${approval.emplId eq emplId && approval.apprStatus eq '대기'}">
			
			<button class="emergency mt-20" type="button" style="float:right;" onclick="openAlert(this);">상신취소</button>
                    <section class="section--alert">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--alert__conts">
                            <button class="btn--close" type="button"></button>
                            <p>
                                확인을 누르시면<br>
                                상신이 취소됩니다. 취소하시겠습니까?
                            </p>
                            
                            <div class="btns-wrap mt-20">
	                            <c:url var="aDelete" value="/appr/remove.hirp">
									<c:param name="apprNo" value="${approval.apprNo} "></c:param>
								</c:url>
                                <button class="point" type="button" onclick="location.href='${aDelete }'">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
			</c:if>
			<div style="border: solid 1px #888; border-radius: 4px; margin-top: 60px; position: relative;">
			
			<table id="apprTable">
							<tr style="height: 30px; border: solid 1px #888;  line-height: 30px;">
								<td>기안자</td>
								<td>${employee.emplName} ${employee.positionCode }</td>
							</tr>
							<tr
								style="height: 30px; border: solid 1px #888; line-height: 30px;">
								<td>기안일</td>
								<td>${approval.writeDate }</td>
							</tr>
							<tr
								style="height: 35px; border: solid 1px #888; line-height: 30px;">
								<td>소속</td>
								<td>${employee.deptCode}</td>
							</tr>
						</table>
						<div id="approvalLine" class="fz-0">
							<!-- <div class="singleApprType">기안자</div> -->
							<div class="singleApprLine">
								<div class='singleApprLineTop'>기안자</div>
								<c:if test="${approval.temporaryStorage eq'N'}">
								<div class='singleApprLineMiddle2'>
								<img src="../../../../resources/images/icons/승인.png" style="width:40px; height:auto; vertical-align: middle;"/>
								<br>
								${employee.emplName} ${employee.positionCode}</div>
								</c:if>
								<c:if test="${approval.temporaryStorage eq'Y'}">
								<div class='singleApprLineMiddle'">
								${employee.emplName} ${employee.positionCode}</div>
								</c:if>
								
								<c:if test="${approval.temporaryStorage eq'N'}">
								<div class='singleApprLineBottom'>
								${approval.writeDate}
								</div>
								</c:if>
							</div>
						<c:forEach var="appr" items="${aList}">
							<div class="singleApprLine">
								<div class='singleApprLineTop'>${appr.apprType }</div>
								<c:if test="${appr.aStatus eq'승인'}">
								<div class='singleApprLineMiddle2'>
								<img src="../../../../resources/images/icons/승인.png" style="width:40px; height:auto; vertical-align: middle;"/>
								<br>
								${appr.employee.emplName} ${appr.employee.positionCode }</div>
								</c:if>
								<c:if test="${appr.aStatus ne '승인'}">
								<div class='singleApprLineMiddle' style="padding-top : 23px;">
								${appr.employee.emplName} ${appr.employee.positionCode}</div>
								</c:if>
								<c:if test="${appr.aStatus eq'승인'}">
								<div class='singleApprLineBottom'>
								${appr.apprDate}
								</div>
								</c:if>
								<c:if test="${appr.aStatus eq'반려'}">
								<div class='singleApprLineBottom' style="color:rgb(192,1, 1);">
								반려 ${appr.apprDate}
								</div>
								</c:if>
								<c:if test="${appr.aStatus eq'합의'}">
								<div class='singleApprLineBottom' style="color: #0b2a60">
								합의 ${appr.apprDate}
								</div>
								</c:if>
								<c:if test="${appr.aStatus eq'반대'}">
								<div class='singleApprLineBottom' style="color:rgb(192,1, 1);">
								반대 ${appr.apprDate}
								</div>
								</c:if>
								<c:if test="${not empty appr.apprComment }">
								<c:if test="${appr.aStatus eq'승인'}">
								<button class="basic" type="button" onclick="openModal(this);" style="margin-top:5px; border-radius:4px;">결재의견</button>
								</c:if>
								<c:if test="${appr.aStatus eq'반려'}">
								<button class="basic" type="button" onclick="openModal(this);" style="margin-top:5px; border-radius:4px;">반려의견</button>
								</c:if>
                    <section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts">
                            <button class="btn--close" type="button"></button>
                            
                            <c:if test="${appr.aStatus eq'승인'}">
                            <h3>${appr.employee.emplName} 결재의견</h3>
                           </c:if>
                           <c:if test="${appr.aStatus eq'반려'}">
                           <h3>${appr.employee.emplName} 반려의견</h3>
                           </c:if>
                           
                               <div style="width:300px;height:200px;border:solid 1px #999"> ${appr.apprComment }</div>
                           
                            
                            <div class="btns-wrap mt-20 t-r">
                                <button class=" point finished closeWindow" type="button">확인</button>
                            </div>
                        </div>
                    </section>
							</c:if>	
							</div>	
						</c:forEach>
						</div>
						
					</div>	
						<div class="row mt-20" style="margin-left:5px; ">
							<div>
								<div style="font-size: 15px; line-height: 30px; text-align: center; ">제목</div>
							</div>

							<div>
								<input type="text" size="125" name="apprTitle" value=" ${approval.apprTitle }" style="border-radius: 4px; border : 1px solid #888" readonly>
							</div>
						</div>
				
				<div id="apprContents">${approval.apprContents }</div>
			
			<c:if test="${not empty approval.fList}">
			<div id="attached-file-div">	 
					<div style="margin-bottom : 10px; font-size:15px; font-weight:bolder;">첨부파일</div>
					<c:forEach var="file" items="${approval.fList}">
						<div><img src="../../../../resources/images/icons/attachedFile.png" style="width:12px; height:auto; vertical-align: middle;"/><a href="../../../../resources/uploadFiles/${file.fileRename }" download>${file.fileName}</a></div>
					</c:forEach>
			</div>
			</c:if>
			
			
			
			</div>
			
			
			<script>
			
			function submitForm(){
				var apprStatus = $("#apprStatus");
				var apprLevel = "${aList[0].emplId}";
				var emplId = "${emplId}";
				var theForm = document.frmSubmit;
				//첫번째 결재자가 로그인한 사람이라면
				console.log("${aList.get(aList.size()-1).emplId}");
			}
			
			</script>
			
			
</body>
</html>