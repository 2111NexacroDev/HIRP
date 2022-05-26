<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->

<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
	<link rel="stylesheet" href="../../../resources/css/chat.css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>웹소켓 채팅</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
	<script type="text/javascript">
	
	var webSocket = {
			init: function(param) {
				chatMsgList(); //웹소켓 연결될 때 이전 채팅 내역 불러오기
				this._url = param.url;
				this._initSocket();
			},
			sendChat: function() {
				this._sendMessage('${param.chatroomNo}', 'CMD_MSG_SEND', "${sessionScope.emplId}", "${sessionScope.emplName}",  "${sessionScope.deptName}", "${sessionScope.positionName}", $('#message').val());
				$('#message').val('');
			},
			sendEnter: function() {
				this._sendMessage('${param.chatroomNo}', 'CMD_ENTER', "${sessionScope.emplId}", "${sessionScope.emplName}", "${sessionScope.deptName}", "${sessionScope.positionName}", $('#message').val());
				$('#message').val('');
			},
			receiveMessage: function(msgData) {

				// 정의된 CMD 코드에 따라서 분기 처리
				if(msgData.cmd == 'CMD_MSG_SEND') {					
					$('#divChatData').append('<div style="text-align:right;">' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + '</div>');
					$('#divChatData').append('<div style="text-align:right;">' + msgData.msg + '</div>');
				}
				// 입장
				else if(msgData.cmd == 'CMD_ENTER') {
					$('#divChatData').append('<div>' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + msgData.msg + '</div>');
				}
				// 퇴장
				else if(msgData.cmd == 'CMD_EXIT') {					
					$('#divChatData').append('<div>' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + msgData.msg + '</div>');
				}
			},
			closeMessage: function(str) {
				$('#divChatData').append('<div>' + '연결 끊김 : ' + str + '</div>');
			},
			disconnect: function() {
				this._socket.close();
			},
			_initSocket: function() {
				this._socket = new SockJS(this._url);
				this._socket.onopen = function(evt) {
					webSocket.sendEnter();
				};
				this._socket.onmessage = function(evt) {
					webSocket.receiveMessage(JSON.parse(evt.data));
				};
				this._socket.onclose = function(evt) {
					webSocket.closeMessage(JSON.parse(evt.data));
				}
			},
			_sendMessage: function(chatroomNo, cmd, emplId, emplName, deptName, positionName, msg) {
				var msgData = {
						chatroomNo : chatroomNo,
						cmd : cmd,
						emplId : emplId,
						emplName : emplName,
						deptName : deptName,
						positionName : positionName,
						msg : msg
				};
				var jsonData = JSON.stringify(msgData);
				this._socket.send(jsonData);
			}
		};
		$(document).ready(function() {
			webSocket.init({ url: '<c:url value="/chat" />' });			
		});
		
		//이전 채팅 내역 불러오기
		function chatMsgList(){
			$.ajax({
				url:"/chat/printMessage.hirp",
				type:"post",
				data:{"chatroomNo" : "${chatroomNo}"},
				success: function(msgList){
					console.log("성공");
	    			console.log(msgList);
	    			var count = msgList.length;
	    			
	    			var $divChatData = $("#divChatData");
	    			$divChatData.html("");//기존 내용 있으면 비우기
	    			
	    			for(var i=0; i<count; i++){
	    				var msgEmplId = "";
	    				var msgContents = "";
	    				if(msgList[i].msgSendid == "${sessionScope.emplId}"){
	    					console.log("아이디 비교");
	    					console.log("${sessionScope.emplId}");
	    					console.log(msgList[i].msgSendid);
	    					console.log(msgList[i].msgSendid == "${sessionScope.emplId}");
		    				msgEmplId = "<div style='text-align:right;'>"+ msgList[i].deptName + " "+ msgList[i].emplName + " " + msgList[i].positionName + "</div>";
		    				msgContents = "<div style='text-align:right;'>"+ msgList[i].msgContents + "</div>";
	    				} else {
	    					msgEmplId = "<div>"+ msgList[i].deptName + " " + msgList[i].emplName + " " + msgList[i].positionName +"</div>";
		    				msgContents = "<div>"+ msgList[i].msgContents + "</div>";
	    				}
						$divChatData.append(msgEmplId);
						$divChatData.append(msgContents);
					}
	    			
	    		},
	    		error: function(){
	    			console.log("실패");
	// 				var $tableBody = $("#emplTable tbody");
	//     			$tableBody.html("");//기존 내용 있으면 비우기
	//     			var $tr = $("<tr>");
	//     			var $text = $("<div class='t-c' style='align:center;'>").html("검색 결과가 없습니다."); //이거 td 안 합쳐짐.
	// 				$tr.append($text);
	// 				$tableBody.append($tr);
	    		}
			});
		}
	</script>
</head>
<body>
	<div style="overflow:scroll; margin: auto; margin-top: 20px; width: 90%; height: 500px; padding: 10px; border: solid 1px #e1e3e9;">
		<div id="divChatData" style="height:100%"></div>
	</div>
	<div class="t-c" style="width: 100%; height: 10%; padding: 10px;">
		<input type="text" id="message" style="width:70%" onkeypress="if(event.keyCode==13){webSocket.sendChat();}" />
		<input type="button" id="btnSend" value="채팅 전송" onclick="webSocket.sendChat()" />
	</div>
</body>
</html>
