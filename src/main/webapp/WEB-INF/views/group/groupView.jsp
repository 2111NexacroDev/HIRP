<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- jstl사용가능. 여러행뽑아내야해서 사용함 -->
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
    <!-- 하이알피 서브페이지 CSS -->

    <style>
        .tree {
            margin-top: 5px;
        }

        .tree,
        .tree ul {
            list-style: none;
            /* 기본 리스트 스타일 제거 */
            padding-left: 10px;
        }

        .tree *:before {
            width: 15px;
            height: 15px;
            display: inline-block;
        }

        .tree label {
            cursor: pointer;
            font-family: NotoSansKrMedium, sans-serif !important;
            font-size: 14px;
            color: #0055CC;
        }

        .tree label:hover {
            color: #00AACC;
        }

        .tree label:before {
            content: '+'
        }

        .tree label.lastTree:before {
            content: 'o';
        }

        .tree label:hover:before {
            content: '+'
        }

        .tree label.lastTree:hover:before {
            content: 'o';
        }

        .tree input[type="checkbox"] {
            display: none;
        }

        .tree input[type="checkbox"]:checked~ul {
            display: none;
        }

        .tree input[type="checkbox"]:checked+label:before {
            content: '-'
        }

        .tree input[type="checkbox"]:checked+label:hover:before {
            content: '-'
        }

        .tree input[type="checkbox"]:checked+label.lastTree:before {
            content: 'o';
        }

        .tree input[type="checkbox"]:checked+label.lastTree:hover:before {
            content: 'o';
        }
    </style>

    <body>
        <form>
            <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
                <div id="conts">
                    <article id="sub" class="">
                        <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
                            <h1 class="basic-border-bottom"></h1>
                            <div id="조직도" class="subConts">
                                <ul class="depth-0 tree">
                                <c:forEach var="data" items="${groupList }">
                                <c:if test="${data.deptLevel eq 0 }">
                                    <li>
                                        <input type="checkbox" id="root">
                                        <label for="root">"${data.deptName}"</label>
                                    </li>
                                </c:if>
                                    <c:if test="${data.deptLevel eq 1 }">
                                        <li class="dept1">
                                            <input type="checkbox" id="${data.deptCode }">
                                            <label for="${data.deptCode }" class="lastTree">"${data.deptName }"</label>
                                        </li>
                                    </c:if>
                                        <c:if test="${data.deptLevel eq 2 }">
                                            <li class="dept2">
                                                <input type="checkbox" id="${data.deptCode }">
                                                <label for="${data.deptCode }" class="lastTree">"${data.deptName }"</label>
                                            </li>
                                        </c:if>
                                            <c:if test="${data.deptLevel eq 3 }">
                                                <li class="dept3">
                                                    <input type="checkbox" id="${data.deptCode }">
                                                    <label for="${data.deptCode }" class="lastTree">"${data.deptName }"</label>
                                                </li>
                                            </c:if>
                                </c:forEach>
                                </ul>

                <script>

                </script>
        </form>
    </body>
</html>