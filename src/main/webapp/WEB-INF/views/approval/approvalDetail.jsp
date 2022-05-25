<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
#apprbtn {
	float: right;
}

#apprTable {
	border: solid 1px #888;
	width: 230px;
	font-size: 15px;
	text-align: center;
	margin: 30px;
}

#approvalLine {
	position: absolute;
	right: 30px;
	top: 25px;
}

.singleApprLine {
	width: 100px;
	height: 110px;
	display: inline-block;
	text-align : center;
	border: solid 1px #888;
	margin : 0px;
}

.singleApprType{
	width: 20px;
	height: 100px;
	display: inline-block;
	text-align : center;
	border: solid 1px #888;

}


.singleApprLineTop{
	width: 100%;
	height: 20%;
	display: inline-block;
	text-align : center;
	border-bottom: solid 1px #888;
	margin : 0px;
	padding-top : 2px;
}

.singleApprLineMiddle{
	width: 100%;
	height: 60%;
	display: inline-block;
	text-align : center;
	border-bottom: solid 1px #888;
	margin : 0px;
	padding-top : 3px;

}

.singleApprLineBottom{
	width: 100%;
	height: 20%;
	display: inline-block;
	text-align : center;
	margin : 0px;
	color :  #888;
	padding-top : 2px;
}


#apprContents{
border: solid 1px #888;
border-radius:4px 4px 0px 0px; 
padding-left:120px;
margin-top :20px;
}

#attached-file-div{
border : solid 1px #888;
border-top : none;
border-radius:0px 0px 4px 4px;
padding : 10px;
}

</style>
</head>
<body>
<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
<h1 class="basic-border-bottom">결재문서함</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
			
			<button class="basic mt-20" type="button" id="apprbtn" onclick="openModal1(this);">반려</button>
			<section class="section--modal modal-reject" >
					<div class="bg-black"></div>
					<div class="section--modal__conts">
						<button class="btn--close" type="button"></button>
						<h3>반려하기</h3>
                            <ul>
                                <li>
                                	<textarea  cols="50" rows="7" placeholder="반려의견을 작성해주세요."></textarea>
                                </li>
                            </ul>
						<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button" onclick="rejectAppr()">반려</button>
								<button class="finished closeWindow"" type="button" >닫기</button>
						</div>
				</section>
			
			<button class="point mt-20" type="button" id="apprbtn" onclick="openApprModal2(this);">결재</button>
				<section class="section--modal modal--appr" >
					<div class="bg-black"></div>
					<div class="section--modal__conts">
						<button class="btn--close" type="button"></button>
						<h3>결재하기</h3>
                            <ul>
                                <li>
                                	<textarea  cols="50" rows="7" placeholder="의견을 작성해주세요."></textarea>
                                </li>
                            </ul>
						<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button" onclick="approveAppr()">승인</button>
								<button class="finished closeWindow" type="button" >닫기</button>
						</div>
				</section>
			
				
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
							<div class="singleApprLine" style="font-size:14px; vertical-align:top;">
								<div class='singleApprLineTop'>기안자</div>
								<c:if test="${approval.temporaryStorage eq'N'}">
								<div class='singleApprLineMiddle'>
								<img src="../../../../resources/images/icons/승인.png" style="width:40px; height:auto; vertical-align: middle;"/>
								<br>
								${employee.emplName} ${employee.positionCode}</div>
								</c:if>
								<c:if test="${approval.temporaryStorage eq'Y'}">
								<div class='singleApprLineMiddle' style="padding-top : 23px;">
								${employee.emplName} ${employee.positionCode}</div>
								</c:if>
								
								<div class='singleApprLineBottom' style="color:rgb(192,1, 1);">
								<c:if test="${approval.temporaryStorage eq'N'}">
								${approval.writeDate}
								</c:if>
								</div>
							</div>
						<c:forEach var="appr" items="${aList}">
							<div class="singleApprLine" style="font-size:14px; vertical-align:top;">
								<div class='singleApprLineTop'>${appr.apprType }</div>
								<c:if test="${appr.status eq'승인'}">
								<div class='singleApprLineMiddle'>
								<img src="../../../../resources/images/icons/승인.png" style="width:40px; height:auto; vertical-align: middle;"/>
								<br>
								${appr.employee.emplName} ${appr.employee.positionCode }</div>
								</c:if>
								<c:if test="${appr.status eq'대기'}">
								<div class='singleApprLineMiddle' style="padding-top : 23px;">
								${appr.employee.emplName} ${appr.employee.positionCode}</div>
								</c:if>
								
								<div class='singleApprLineBottom' style="color:rgb(192,1, 1);">
								<c:if test="${appr.status eq'승인'}">
								${approval.writeDate}
								</c:if>
								</div>
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
			<div id="attached-file-div">	 
					<div style="margin-bottom : 10px; font-size:15px; font-weight:bolder;">첨부파일</div>
					<c:forEach var="file" items="${approval.fList}">
						<div><img src="../../../../resources/images/icons/attachedFile.png" style="width:12px; height:auto; vertical-align: middle;"/><a href="../../../../resources/uploadFiles/${file.fileRename }" download>${file.fileName}</a></div>
					</c:forEach>
			</div>
			</div>
			<script>
			function openApprModal2(modalWindow) {
			    $(modalWindow).siblings('.modal--appr').css('display', 'flex');
			}
			function openModal1(modalWindow) {
				    $(modalWindow).siblings('.modal-reject').css('display', 'flex');
			}
			    
			</script>
			
			
</body>
</html>