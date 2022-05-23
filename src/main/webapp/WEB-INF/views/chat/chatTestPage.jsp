<%@ page session="true" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="../../resources/js/sockjs.min.js"></script>
 <script src="https://code.jquery.com/jquery-3.6.0.min.js"
     integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<html>
<head>
    <title>Home</title>
    <meta charset="UTF-8"/>
</head>
<body>
    <form id="chatForm">
        <div class="chat_start_main">
            상담 CHAT
        </div>
        <div class="chat_main" style="display:none;">
            <div class="modal-header" style="height:20%;">
                상담 CHAT 
            </div>
            <div class="modal-content" id="chat" style="height:60%;">
                
            </div>
            <div class="modal-footer">
                <input type="text" id="message" class="form-control" style="height:20%;" placeholder="메세지를 입력하세요"/>    
            </div>
        </div>
<!--         <button class="">send</button> -->
    </form>
    <script>
		//전역변수 선언-모든 홈페이지에서 사용 할 수 있게 index에 저장
		var socket = null;
		connectWS();
// 		$(document).ready(function(){
// 		    if(!isEmpty($("#session_id").val()))
// 		            connectWS();
// 		});
		    $(".chat_start_main").click(function(){
		        $(this).css("display","none");
		        $(".chat_main").css("display","inline");
		    })
		    $(".chat_main .modal-header").click(function(){
		        $(".chat_start_main").css("display","inline");
		        $(".chat_main").css("display","none");
		    });
		 
		    function connectWS(){
		        var sock = new SockJS("/echo");
		            socket =sock;
		        sock.onopen = function() {
		               console.log('info: connection opened.');
		        };
		        sock.onmessage = function(e){
		//             console.log(e);
		//             var strArray = e.data.split(":");
		//             if(e.data.indexof(":") > -1){
		//                 $(".chat_start_main").text(strArray[0]+"님이 메세지를 보냈습니다.");
		//             }
		//             else{
		//             }
		            $("#chat").append(e.data + "<br/>");
		        }
		        sock.onclose = function(){
		            $("#chat").append("연결 종료");
// 		             setTimeout(function(){connectWS();} , 10000); 
		        }
		        sock.onerror = function (err) {console.log('Errors : ' , err);};
		 
		        $("#chatForm").submit(function(event){
		            event.preventDefault();
		                sock.send($("#message").val());
		                $("#message").val('').focus();    
		        });
		    }
	</script>
</body>
</html>
