// ================================
// Local-time analog clock(s)
// Supports any number of .analog-clock instances on the page.
// The hands are spun by CSS animations (see .hand in main.css), so there is no
// per-frame JavaScript. This script only offsets each animation so the hands
// line up with the current time, then reveals them. It also fills in any
// [data-clock-date] element with today's local date.
// ================================
let clocks = [];

function syncDates(t) {
    document.querySelectorAll('[data-clock-date]').forEach((el) => {
        el.textContent = t.toLocaleDateString(undefined, {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        });
        el.dateTime = t.toLocaleDateString('sv'); // YYYY-MM-DD in local time
    });
}

function syncClocks() {
    const t = new Date();
    syncDates(t); // runs with each minute resync, so the date rolls over at midnight
    if (!clocks.length) return;

    // Seconds elapsed within each hand's cycle (1 min, 1 hour, 12 hours)
    const secondPhase = t.getSeconds() + t.getMilliseconds() / 1000;
    const minutePhase = t.getMinutes() * 60 + secondPhase;
    const hourPhase = (t.getHours() % 12) * 3600 + minutePhase;

    // Restart the animations so the new offsets apply from a clean start.
    // All writes happen before the single reflow, and nothing paints in between.
    clocks.forEach((c) => c.hands.forEach((hand) => { hand.style.animationName = 'none'; }));
    clocks[0].el.getBoundingClientRect();

    clocks.forEach((c) => {
        c.hour.style.animationDelay = `-${hourPhase}s`;
        c.minute.style.animationDelay = `-${minutePhase}s`;
        c.second.style.animationDelay = `-${secondPhase}s`;
        c.hands.forEach((hand) => { hand.style.animationName = ''; });
        c.el.classList.add('is-ready');
    });
}

function startClocks() {
    clocks = Array.from(document.querySelectorAll('.analog-clock'))
        .map((el) => {
            const hour = el.querySelector('.hand-hour');
            const minute = el.querySelector('.hand-minute');
            const second = el.querySelector('.hand-second');
            return { el, hour, minute, second, hands: [hour, minute, second] };
        })
        .filter((c) => c.hour && c.minute && c.second);

    syncClocks();

    // Re-anchor to the wall clock periodically so DST changes, sleep/wake,
    // or system clock adjustments never leave the hands off.
    setInterval(syncClocks, 60 * 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startClocks);
} else {
    startClocks();
}

// Resync when the tab comes back or the page is restored from the back/forward cache
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncClocks();
});
window.addEventListener('pageshow', (e) => {
    if (e.persisted) syncClocks();
});
