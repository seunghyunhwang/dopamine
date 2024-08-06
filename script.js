const heavenlyStems = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const earthlyBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const timeBranches = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const optimalMatches = {
    year: {
        "갑자": "을축", "을축": "병인", "병인": "정묘", "정묘": "무진", "무진": "기사",
        "기사": "경오", "경오": "신미", "신미": "임신", "임신": "계유", "계유": "갑술",
    },
    month: {
        "자월": "축월", "축월": "인월", "인월": "묘월", "묘월": "진월", "진월": "사월",
    },
    day: {
        "갑자": "을축", "을축": "병인", "병인": "정묘", "정묘": "무진", "무진": "기사",
    },
    time: {
        "갑자": "을축", "을축": "병인", "병인": "정묘", "정묘": "무진", "무진": "기사",
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

function convertSolarToLunar(solarDate) {
    const [year, month, day] = solarDate.split('-').map(Number);
    const lunar = solarlunar.solar2lunar(year, month, day);
    return `${lunar.lYear}-${String(lunar.lMonth).padStart(2, '0')}-${String(lunar.lDay).padStart(2, '0')}`;
}

function calculateFourPillars() {
    const nickname = document.getElementById('nickname').value;
    const birthDate = document.getElementById('birthdate').value;
    const calendarType = document.getElementById('calendarType').value;
    const birthTime = document.getElementById('birthtime').value;

    if (!nickname || !birthDate || !birthTime) {
        document.getElementById('result').innerHTML = `<p class="placeholder">닉네임과 생년월일을 입력해주세요.</p>`;
        return;
    }

    let date = birthDate;
    if (calendarType === 'solar') {
        date = convertSolarToLunar(birthDate);
    }

    const lunarDate = new Date(date);
    const timeIndex = Math.floor((parseInt(birthTime.split(':')[0], 10) + 1) / 2) % 12;

    // 연주 계산
    const year = lunarDate.getFullYear();
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = `${heavenlyStems[yearStemIndex]}${earthlyBranches[yearBranchIndex]}`;

    // 월주 계산
    const month = lunarDate.getMonth() + 1;
    const monthStemIndex = (yearStemIndex * 2 + month - 1) % 10;
    const monthBranchIndex = (month + 1) % 12;
    const monthPillar = `${heavenlyStems[monthStemIndex]}${earthlyBranches[monthBranchIndex]}`;

    // 일주 계산
    const baseDate = new Date(year, 0, 1);
    const dayOffset = Math.floor((lunarDate - baseDate) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (dayOffset + 6) % 10;
    const dayBranchIndex = (dayOffset + 10) % 12;
    const dayPillar = `${heavenlyStems[dayStemIndex]}${earthlyBranches[dayBranchIndex]}`;

    // 시주 계산
    const timePillar = `${heavenlyStems[(dayStemIndex * 2 + timeIndex) % 10]}${timeBranches[timeIndex]}`;

    const optimalYearMatch = optimalMatches.year[yearPillar] || "궁합 없음";
    const optimalMonthMatch = optimalMatches.month[monthPillar] || "궁합 없음";
    const optimalDayMatch = optimalMatches.day[dayPillar] || "궁합 없음";
    const optimalTimeMatch = optimalMatches.time[timePillar] || "궁합 없음";

    document.getElementById('result').innerHTML = `
        <p>${nickname} 님의 연주: ${yearPillar}</p>
        <p>${nickname} 님의 월주: ${monthPillar}</p>
        <p>${nickname} 님의 일주: ${dayPillar}</p>
        <p>${nickname} 님의 시주: ${timePillar}</p>
        <p>최적의 연주 궁합: ${optimalYearMatch}</p>
        <p>최적의 월주 궁합: ${optimalMonthMatch}</p>
        <p>최적의 일주 궁합: ${optimalDayMatch}</p>
        <p>최적의 시주 궁합: ${optimalTimeMatch}</p>
    `;
}
