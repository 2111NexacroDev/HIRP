<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script>
    $(function(){
        let addr = location.href;
        if(addr.match('/board/') || addr.match('/notice/')) {
            $('#gnb ul>li:nth-child(3) a').addClass('on');
            $('#snb>ul>li:nth-child(1)>ul>li:nth-child(1)').addClass('on');
        }
        if(addr.match('/free/')) {
            $('#gnb ul>li:nth-child(3) a').addClass('on');
            $('#snb>ul>li:nth-child(1)>ul>li:nth-child(2)').addClass('on');
        }
        if(addr.match('/anonymous/')) {
            $('#gnb ul>li:nth-child(3) a').addClass('on');
            $('#snb>ul>li:nth-child(1)>ul>li:nth-child(3)').addClass('on');
        }
        if(addr.match('/department/')) {
            $('#gnb ul>li:nth-child(3) a').addClass('on');
            $('#snb>ul>li:nth-child(2)>ul>li:nth-child(1)').addClass('on');
        }
        if(addr.match('/written/')) {
            $('#gnb ul>li:nth-child(3) a').addClass('on');
            $('#snb>ul>li:nth-child(3)>ul>li:nth-child(1)').addClass('on');
        }
        

        $('.btn--boardWrite').on('click', function(){
            if(addr.match('/board/') || addr.match('/notice/') || addr.match('/written/')) {location.href = '/board/writeView.hirp';}
            if(addr.match('/free/')) {location.href = '/free/writeView.hirp';}
            if(addr.match('/anonymous/')) {location.href = '/anonymous/writeView.hirp';}
            if(addr.match('/department/')) {location.href = '/department/writeView.hirp';}
        });
    });
</script>

<aside id="snb">
    <h1>게시판</h1>
    <button class="btn--function btn--boardWrite" type="button">글쓰기</button>
    <ul>
        <li>
            <a href="">전사게시판</a>
            <ul>
                <li><a href="/notice/list.hirp">공지게시판</a></li>
                <li><a href="/free/list.hirp">자유게시판</a></li>
                <li><a href="/anonymous/list.hirp">익명게시판</a></li>
            </ul>
            <br><!-- 나중에 수정 -->
        </li>
            <li>
            <a href="">부서게시판</a>
            <ul>       
                <li><a href="/department/list.hirp">개발팀 게시판</a></li>
            </ul>
            <br><!-- 나중에 수정 -->
        </li>
        <li>
            <a href="">나의 활동</a>
            <ul>       
                <li><a href="/written/board.hirp">작성한 글 조회</a></li>
                <!-- <li><a href="#">작성한 댓글 조회</a></li> -->
            </ul>
        </li>
    </ul>
</aside>