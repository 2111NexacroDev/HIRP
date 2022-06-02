$(function () {
    // 날씨 기능
    const monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    let dateObj = new Date();
    let month = monthNames[dateObj.getUTCMonth()];
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = `${year}년 ${month}월 ${day}일`;

    const app = document.querySelector('.weather-box');

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&lang=kr&APPID=674ef6a6bffc027168759b898f13e752&units=metric')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            app.insertAdjacentHTML('afterbegin', `
        <div class="titlebar">
            <p class="date">${newdate}</p>
            <h4 class="city">${data.name}</h4>
            <p class="description">지금 날씨는 '${data.weather[0].description}' !</p>
        </div>
        <div class="temperature">
            <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" /></p>
        </div>
        <div class="extra">
            <div class="info col-3">
                <h5>기온</h5>
                <p>${Math.round(data.main.temp)}°C</p>
            </div>
            <div class="info col-3">
                <h5>풍속</h5>
                <p>${data.wind.speed}mps</p>
            </div>
            <div class="info col-3">
                <h5>가시거리</h5>
                <p>${data.visibility} m</p>
            </div>
            <div class="info col-3">
                <h5>기압</h5>
                <p>${data.main.pressure} mph</p>
            </div>
        </div>`)
        });

    // 근태
    // 지금 시간
    function printClock() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var week = new Array('일', '월', '화', '수', '목', '금', '토');
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);
        var dateString = year + '-' + month + '-' + day + '(' + week[date.getDay()] + ')';
        var timeString = hours + ':' + minutes + ':' + seconds;
        document.getElementById("result").innerHTML = dateString + '<br/>' + '<span>' + timeString + '</span>';
        setInterval(printClock, 1000); // 1초마다 바뀌게 해주는 것
    }

    // 켜지자마자 실행할것들 (뒤에 적을땐 안적어도 상관없음)
    $(function () {
        printClock();
    })

    // 출근시간
    function startBtn() {
        var emplId = "user01"; // 세션에 담은것 갖고오게해줌
        $.ajax({
            url: "/time/timeStart.hirp",
            type: "POST",
            data: {
                "emplId": emplId
            },
            success: function (data, result) {
                if (data == "fail") {
                    alert("이미 출근 하셨습니다.");
                } else {
                    alert("출근시간 등록에 성공했습니다.");
                }
            },
            error: function () {
                alert("출근시간 등록에 실패했습니다.");
            }
        });
    }

    // 퇴근시간
    function endBtn() {
        var emplId = "user01"; // 세션에 담은것 갖고오게해줌
        $.ajax({
            url: "/time/timeEnd.hirp",
            type: "POST",
            data: {
                "emplId": emplId
            },
            success: function (data, result) {
                if (data == "fail") {
                    alert("이미 퇴근 하셨습니다.");
                } else {
                    alert("퇴근시간 등록에 성공했습니다.");
                }

            },
            error: function () {
                alert("퇴근시간 등록에 실패했습니다.");
            }
        });
    }

});
