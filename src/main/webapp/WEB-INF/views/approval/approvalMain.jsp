<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<style>
.approvalLine-btn{
float : right;
background-color : white;
border : solid 1px lightgray;
border-radius: 10px;
margin-top : 10px;
margin-left : 10px;
width : 100px;
height : 35px;
}
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
            <h1 class="basic-border-bottom">전자결재 홈</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->

               
                 <!-- 칸 나누는 법 예시 -->
                <div class="grid-guide-wrap  padding-20 mt-20">
                  
                    <div class=" row mt-20 " >
                        <!-- <h4 class="col-12 mb-20">자식 요소 높이 통일 필요할 경우</h4> -->
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기1</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기2</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기3</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기4</div>
                        </div>
                    </div>
                </div>
               
            </div>
               
               

                <table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>제목1</th>
                            <th>제목2</th>
                            <th>제목3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>

				<table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>제목1</th>
                            <th>제목2</th>
                            <th>제목3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>
               
              
        </article>
    </div>

</body>

</html>