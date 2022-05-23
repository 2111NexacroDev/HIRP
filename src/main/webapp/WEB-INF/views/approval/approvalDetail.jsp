<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
<h1 class="basic-border-bottom">결재문서함</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
			<div id="boardTop">
				<div id="title-div"> ${approval.apprTitle }</div>
					<div class="write-div"><img src="../../../../resources/images/profile.jpg" style="width:40px; height:auto; vertical-align: middle;"/> ${approval.emplId }</div>
					<div class="write-div">${approval.writeDate }</div>
				<div id="attached-file-div">		
					<c:forEach var="file" items="${approval.fList}">
						<div><img src="../../../../resources/images/icons/attachedFile.png" style="width:12px; height:auto; vertical-align: middle;"/><a href="../../../../resources/uploadFiles/${file.fileRename }" download>${file.fileName}</a></div>
					</c:forEach>
				</div>
				<div id="board-contents-div">${approval.apprContents }</div>
			</div>
</body>
</html>