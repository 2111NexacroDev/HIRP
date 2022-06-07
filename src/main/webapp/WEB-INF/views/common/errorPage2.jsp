<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->
<head>
<meta charset="UTF-8">
<title></title>
</head>
<body>
<script>
		var message = "${msg}";
		var returnUrl = "${url}";
		if("${formNo}"!= null){
			var formNo = "${formNo}";
			alert(message);
			location.href=returnUrl+formNo;
		}else{
		alert(message);
		location.href=returnUrl;
		}
</script>
</body>
</html>