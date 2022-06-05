<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Error</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet"><!-- 노토산스 코리안 서체 CDN -->
<style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding-top: 440px;
        background: #ddedfa url("../../../resources/images/img_404.jpeg") no-repeat center 40px;
        font-family: "Noto Sans KR", sans-serif;
        text-align: center;
        box-sizing: border-box;
    }

    p {
        font-weight: 300;
        font-size: 24px;
    }

    p strong {
        display: block;
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 40px;
    }

    p small {
        display: block;
        margin-top: 20px;
        font-size: 18px;
    }
</style>
</head>
<body>

	<p>${msg}</p>

</body>
</html>