// ================================
// Smooth local-time analog clock(s)
// Supports any number of .analog-clock instances on the page.
// ================================
let clockFrame = null;
let clocks = [];

function collectClocks() {
    clocks = Array.from(document.querySelectorAll('.analog-clock'))
        .map((el) => ({
            hour: el.querySelector('.hand-hour'),
            minute: el.querySelector('.hand-minute'),
            second: el.querySelector('.hand-second'),
        }))
        .filter((c) => c.hour && c.minute && c.second);

    // Disable transitions and lock transform origin for crisp, jump-free motion
    clocks.forEach((c) => {
        [c.hour, c.minute, c.second].forEach((hand) => {
            hand.style.transition = 'none';
            hand.style.transformOrigin = '30px 30px';
        });
    });
}

function renderClocks() {
    const t = new Date();
    const smoothSeconds = t.getSeconds() + t.getMilliseconds() / 1000;
    const smoothMinutes = t.getMinutes() + smoothSeconds / 60;
    const smoothHours = (t.getHours() % 12) + smoothMinutes / 60;

    const secondAngle = smoothSeconds * 6;
    const minuteAngle = smoothMinutes * 6;
    const hourAngle = smoothHours * 30;

    clocks.forEach((c) => {
        c.hour.style.transform = `rotate(${hourAngle}deg)`;
        c.minute.style.transform = `rotate(${minuteAngle}deg)`;
        c.second.style.transform = `rotate(${secondAngle}deg)`;
    });

    clockFrame = requestAnimationFrame(renderClocks);
}

function startClocks() {
    if (clockFrame) {
        cancelAnimationFrame(clockFrame);
        clockFrame = null;
    }
    collectClocks();
    if (clocks.length) {
        renderClocks();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startClocks);
} else {
    startClocks();
}

// Pause when hidden, resume when visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (clockFrame) {
            cancelAnimationFrame(clockFrame);
            clockFrame = null;
        }
    } else {
        startClocks();
    }
});
