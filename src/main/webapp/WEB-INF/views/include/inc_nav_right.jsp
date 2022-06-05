<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<nav id="nav--right">
    <c:if test="${sessionScope.emplId eq 'admin'}"><a class="a--adminLink" href="/admin.hirp">관리자 페이지로</a></c:if>
    <button class="btn--chat" type="button" 
    	onclick="window.open('/chatMain.hirp','chatting','width=400,height=600,location=no,status=no,scrollbars=no');"></button>
    <button class="btn--alarm" type="button">
        <span>3</span>
    </button>
    <button class="btn--star" type="button"></button>
    <button class="btn--profile" type="button">
        <c:if test="${sessionScope.emplProfile ne null}">
            <img src="../../../resources/uploadFiles/${sessionScope.emplProfile }" alt="프로필사진">
        </c:if>
        <c:if test="${sessionScope.emplProfile eq null}">
            <img src="../../../resources/images/img_no_profile.png" alt="프로필사진">
        </c:if>
    </button>

    <section class="nav--right__info">
        <ul>
            <li><a href="/employee/mypageView1.hirp">내 정보 보기</a></li>
            <li><a href="#">알림 설정</a></li>
            <li><a href="/employee/logout.hirp">로그아웃</a></li>
        </ul>
    </section>
</nav>

<script>
    $(function(){        
        if($('.form--srch').length > 0) {
            $('.a--adminLink').hide();
        }
    });
</script>