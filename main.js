// 램덤번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약 유저가 램덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 사용자 번호 Down!!
// 랜덤번호가 > 유저번호 UP!!
// Reset버튼 클릭하면 게임 Reset
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById('play_button');
let userInput = document.getElementById('user_input');
let resultArea = document.getElementById('result_area');
let resetButton = document.getElementById('reset_button');
let chanceArea = document.getElementById('chance_area');
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener('click', play);
pickRandomNum();
resetButton.addEventListener('click', reset);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log('정답', computerNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = '1과 100사이를 입력해주세요';
        userInput.value = '';
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = '이미지 입력한 숫자입니다. 다른 숫자로 입력해';
        return;
    }

    chanceArea.textContent = `남은 찬스:${chances - 1}`;
    userInput.value = '';
    chances--;

    if (userValue < computerNum) {
        resultArea.textContent = 'Up!!';
    } else if (userValue > computerNum) {
        resultArea.textContent = 'Down!!';
    } else {
        resultArea.textContent = 'Great!!';
        gameOver = true;
        chanceArea.textContent = '축하합니다';
    }

    history.push(userValue);

    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver === true) {
        playButton.disabled = true;
    }
    userInput.focus();
}

function reset() {
    userInput.value = '';
    resultArea.textContent = '결과가 나온다!!';
    pickRandomNum();
}
