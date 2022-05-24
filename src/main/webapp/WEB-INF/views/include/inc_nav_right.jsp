<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<nav id="nav--right">
    <c:if test="${sessionScope.emplId eq 'admin'}"><a class="a--adminLink" href="/admin.hirp">관리자 페이지로</a></c:if>
    <button class="btn--chat" type="button" onclick="OpenWin_variety('','chatting room',200,500,10,10)"></button>
    <button class="btn--alarm" type="button">
        <span>3</span>
    </button>
    <button class="btn--star" type="button"></button>
    <button class="btn--profile" type="button">
        <img src="../resources/images/profile.jpg" alt="profile">
        <!-- 유저마다 다른 사진 출력돼야함 -->
    </button>

    <section class="nav--right__info">
        <ul>
            <li><a href="/employee/mypageView1.hirp">내 정보 수정</a></li>
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