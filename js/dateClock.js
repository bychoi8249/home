let startTime = new Date();

function updateClock() {

    // 날짜 - 형식 변수 선언!
    let today = new Date();
    let yyyy = today.getFullYear();
    let yy = today.getFullYear().toString().substr(-2);
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let days = ["일", "월", "화", "수", "목", "금", "토"];
    let day = today.getDay();

    // 날짜 - 형식 변수 선언! | #월 #일 #요일 | 표시 형식 mm-dd(요일)
    let mmdd = "-" + mm + "-" + dd + "(" + days[day] + ")"; // 페이지 - 형식 변수 선언!
    let dateString = yyyy + mmdd;

    // 시간 - 형식 변수 선언!
    let hr = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let sec = String(today.getSeconds()).padStart(2, '0');

    // 타이틀 위치용 - 형식 변수 선언!
    let clockText = hr + ":" + min + ":" + sec;
    let dateTitle = yy + mmdd;

    /* // 시간 - 형식 변수 선언! | #남은 시간
    let remainingHours = String(23 - today.getHours()).padStart(2, '0');
    let remainingMinutes = String(59 - today.getMinutes()).padStart(2, '0');
    let remainingSeconds = String(59 - today.getSeconds()).padStart(2, '0');
    let remainingTime = "- " + remainingHours + ":" + remainingMinutes + ":" + remainingSeconds +
        " ( - " + ((remainingHours * 60) + Number(remainingMinutes)) + "분)"; */


    // 시간 - 형식 변수 선언! | #개인 하루 잔여 시간 22:30(취침 시간 ≒ 하루 마감 시간)
    let targetTime = new Date(); // 현재 시간 가져옴.
    targetTime.setHours(22, 30, 0); // 목표 시간(22:30) 설정.

    // let currentTime = new Date(); // 현재 시간 가져옴.

    let myRemainingTime = targetTime - today; // 목표 시간과 현재 시간(currentTime)의 차이.

    if (myRemainingTime > 0) {
        let myRemainingHours = Math.floor(myRemainingTime / (1000 * 60 * 60)); // 시간 단위 구함.
        let myRemainingMinutes = Math.floor((myRemainingTime % (1000 * 60 * 60)) / (1000 * 60)); // 분 단위 구함.
        let myRemainingSeconds = Math.floor((myRemainingTime % (1000 * 60)) / 1000); // 초 단위 구함.

        let formattedTime = `${myRemainingHours.toString().padStart(2, '0')}:${myRemainingMinutes.toString().padStart(2, '0')}:${myRemainingSeconds.toString().padStart(2, '0')}`;
        let totalMinutes = myRemainingHours * 60 + myRemainingMinutes; // #개인 하루 가용 잔여 시간(분 단위 계산)

        let result = `- ${formattedTime} ( -${totalMinutes}분)`;
        document.getElementById('myRemainingTime').textContent = result;
        //           console.log(result); // 결과 출력
    } else {
        document.getElementById('myRemainingTime').textContent = "취침 시간 초과!"; // 이미 지난 경우 출력
    }


    // 날짜 - 형식 변수 선언!
    let remainingMonths = "- " + String(12 - mm).padStart(2, 0) + "개월";   // #당해년도/남은 개월수

    // 날짜 - 형식 변수 선언! | #해당 월/남은 일수
    let lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    let remainingDays = lastDay - today.getDate() + "일";


    // UI에 표현할 결과 요소
    document.title = clockText + " " + dateTitle + " | 북마크";
    document.getElementById('date').textContent = dateString;   // 페이지 1줄
    document.getElementById('clock').textContent = clockText;   // 페이지 2줄
    // document.getElementById('remainingTime').textContent = remainingTime;  // 페이지 3줄

    document.getElementById('remainingDate').textContent = remainingMonths + " " + remainingDays;   // 페이지 4줄

    // 경과 시간 - 형식 변수 선언!
    let elapsedTime = new Date(today - startTime);
    let elapsedHours = String(elapsedTime.getUTCHours()).padStart(2, '0');
    let elapsedMinutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
    let elapsedSeconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');

    document.getElementById('elapsedTime').textContent = "+ " + elapsedHours + ":" + elapsedMinutes + ":" + elapsedSeconds + " 경과 시간";  // 페이지 5줄
}


setInterval(updateClock, 1000);
updateClock(); // 초기 실행

window.addEventListener('beforeunload', function () {
    startTime = new Date(); // 페이지를 닫을 때 시간을 초기화
});