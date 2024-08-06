// 육십갑자 계산을 위한 데이터
const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];

document.addEventListener('DOMContentLoaded', () => {
    const birthdateInput = document.getElementById('birthdate');
    birthdateInput.setAttribute('min', '1986-01-01');
    birthdateInput.setAttribute('max', '1996-12-31');
    birthdateInput.addEventListener('change', validateDate);
});

function validateDate() {
    const birthdateInput = document.getElementById('birthdate');
    const minDate = new Date(birthdateInput.getAttribute('min'));
    const maxDate = new Date(birthdateInput.getAttribute('max'));
    const selectedDate = new Date(birthdateInput.value);

    if (selectedDate < minDate || selectedDate > maxDate) {
        alert('생년월일은 1986년 1월 1일부터 1996년 12월 31일 사이여야 합니다.');
        birthdateInput.value = '1989-01-01';
        document.getElementById('result').innerHTML = `<p class="placeholder">닉네임과 생년월일을 입력해주세요.</p>`;
    }
}

function calculateFourPillars() {
    // 입력값 가져오기
    const nickname = document.getElementById('nickname').value;
    const birthDate = document.getElementById('birthdate').value;

    if (!nickname || !birthDate) {
        document.getElementById('result').innerHTML = `<p class="placeholder">닉네임과 생년월일을 입력해주세요.</p>`;
        return;
    }

    // 생년월일을 Date 객체로 변환
    const date = new Date(birthDate);

    // 연주 계산
    const year = date.getFullYear();
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = `${heavenlyStems[yearStemIndex]}${earthlyBranches[yearBranchIndex]}`;

    // 월주 계산
    const month = date.getMonth() + 1; // 1월 = 0, 2월 = 1, ...
    const monthStemIndex = (yearStemIndex * 2 + month - 1) % 10;
    const monthBranchIndex = (month + 1) % 12; // 월의 지지는 음력으로 시작하므로 +1
    const monthPillar = `${heavenlyStems[monthStemIndex]}${earthlyBranches[monthBranchIndex]}`;

    // 일주 계산
    const baseDate = new Date(year, 0, 1);
    const dayOffset = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (dayOffset + 6) % 10; // 예제에서 6은 1월 1일의 천간 오프셋
    const dayBranchIndex = (dayOffset + 10) % 12; // 예제에서 10은 1월 1일의 지지 오프셋
    const dayPillar = `${heavenlyStems[dayStemIndex]}${earthlyBranches[dayBranchIndex]}`;

    // 결과 표시
    document.getElementById('result').innerHTML = `
        <p>닉네임: ${nickname}</p>
        <p>연주: ${yearPillar}</p>
        <p>월주: ${monthPillar}</p>
        <p>일주: ${dayPillar}</p>
        <p>최적의 궁합: ${findBestMatch(yearPillar, monthPillar, dayPillar)}</p>
    `;
}

function findBestMatch(yearPillar, monthPillar, dayPillar) {
    // 예시: 아주 단순한 궁합 계산 로직
    const allCombinations = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 12; j++) {
            allCombinations.push(`${heavenlyStems[i]}${earthlyBranches[j]}`);
        }
    }

    // 여기서 실제로 복잡한 궁합 계산 로직을 구현해야 함
    // 현재는 단순히 임의의 궁합을 반환함
    const randomIndex = Math.floor(Math.random() * allCombinations.length);
    return allCombinations[randomIndex];
}
