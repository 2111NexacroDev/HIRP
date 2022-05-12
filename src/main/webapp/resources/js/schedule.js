function getStyle(elem, cssprop, cssprop2) {
    if (elem.currentStyle) {
        return elem.currentStyle[cssprop];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(cssprop2);

    } else {
        return null;
    }
}

function getAlarm(status) {
    if (status.checked == true) {
        document.getElementsByName('scheduleAlarm')[0].value = 'Y';
    } else {
        document.getElementsByName('scheduleAlarm')[0].value = 'N';
    };
}

document.addEventListener('DOMContentLoaded', function () {
    /* 컬러 선택 관련 스크립트 */
    let selectedColor = 'rgb(195,96,96)';
    let colors = document.querySelectorAll('.colors > span');

    colors.forEach((el, index) => {
        el.onclick = () => {
            selectedColor = getStyle(colors[index], "backgroundColor", "background-color");
            // 전체 컬러에서 selected 클래스 제거
            for (let i = 0; i < colors.length; i++) {
                colors[i].className = '';
            }
            // 클릭한 컬러에 selected 클래스 추가
            colors[index].className = 'selected';
            document.getElementsByName('scheduleColor')[0].value = selectedColor;
        }
    });


    let isCheckedCompany = true;
    let isCheckedTeam = true;
    let isCheckedPersonal = true;

    $('.ul--category li input[type="checkbox"]').on('click', function () {
        if ($(this).attr('id') == 'company') {
            if (isCheckedCompany == true) {
                isCheckedCompany = false;
                console.log(isCheckedCompany);
                $('.category-all').hide();
            } else {
                isCheckedCompany = true;
                console.log(isCheckedCompany);
                $('.category-all').show();
            }
        } else if ($(this).attr('id') == 'team') {
            if (isCheckedTeam == true) {
                isCheckedTeam = false;
                $('.category-team').hide();
            } else {
                isCheckedTeam = true;
                $('.category-team').show();
            }
        } else {
            if (isCheckedPersonal == true) {
                isCheckedPersonal = false;
                $('.category-personal').hide();
            } else {
                isCheckedPersonal = true;
                $('.category-personal').show();
            }
        }
    });
});