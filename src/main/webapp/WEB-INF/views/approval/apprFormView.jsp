<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

</head>

<body>
    <%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

            <h1 class="basic-border-bottom">결재양식조회</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
       					<div class="row mt-20" style="margin-left:5px; ">
							<div>
								<div style="font-size: 15px; line-height: 30px; text-align: center; ">제목</div>
							</div>

							<div>
								<input type="text" size="125" name="apprTitle" value=" ${apprform.formTitle }" style="border-radius: 4px; border : 1px solid #888" readonly>
							</div>
						</div>
				
				<div id="apprContents">${apprform.formContents }</div>
</body>
</html>