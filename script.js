const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const optimalMatches = {
    year: {
        "갑": "을", "을": "갑", "병": "정", "정": "병", "무": "기", "기": "무", "경": "신", "신": "경", "임": "계", "계": "임"
    },
    month: {
        "자": "축", "축": "자", "인": "묘", "묘": "인", "진": "사", "사": "진", "오": "미", "미": "오", "신": "유", "유": "신", "술": "해", "해": "술"
    },
    day: {
        "갑": "기", "을": "경", "병": "신", "정": "임", "무": "계", "기": "갑", "경": "을", "신": "병", "임": "정", "계": "무"
    }
};

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
    const nickname = document.getElementById('nickname').value;
    const birthDate = document.getElementById('birthdate').value;

    if (!nickname || !birthDate) {
        document.getElementById('result').innerHTML = `<p class="placeholder">닉네임과 생년월일을 입력해주세요.</p>`;
        return;
    }

    const date = new Date(birthDate);

    // 연주 계산
    const year = date.getFullYear();
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = `${heavenlyStems[yearStemIndex]}${earthlyBranches[yearBranchIndex]}`;

    // 월주 계산
    const month = date.getMonth() + 1;
    const monthStemIndex = (yearStemIndex * 2 + month - 1) % 10;
    const monthBranchIndex = (month + 1) % 12;
    const monthPillar = `${heavenlyStems[monthStemIndex]}${earthlyBranches[monthBranchIndex]}`;

    // 일주 계산
    const baseDate = new Date(year, 0, 1);
    const dayOffset = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (dayOffset + 6) % 10;
    const dayBranchIndex = (dayOffset + 10) % 12;
    const dayPillar = `${heavenlyStems[dayStemIndex]}${earthlyBranches[dayBranchIndex]}`;

    const optimalYearMatch = optimalMatches.year[heavenlyStems[yearStemIndex]] || "궁합 없음";
    const optimalMonthMatch = optimalMatches.month[earthlyBranches[monthBranchIndex]] || "궁합 없음";
    const optimalDayMatch = optimalMatches.day[heavenlyStems[dayStemIndex]] || "궁합 없음";

    document.getElementById('result').innerHTML = `
        <p>닉네임: ${nickname}</p>
        <p>연주: ${yearPillar}</p>
        <p>월주: ${monthPillar}</p>
        <p>일주: ${dayPillar}</p>
        <p>최적의 연주 궁합: ${optimalYearMatch}</p>
        <p>최적의 월주 궁합: ${optimalMonthMatch}</p>
        <p>최적의 일주 궁합: ${optimalDayMatch}</p>
    `;
}
