// ================================
// Fully Smooth Local-Time Clock
// ================================
let clockAnimationFrame = null;
let clockElements = null;

// Cache clock elements for better performance
function getCacheClockElements() {
    if (!clockElements) {
        clockElements = {
            hour: document.getElementById('hour-hand'),
            minute: document.getElementById('minute-hand'),
            second: document.getElementById('second-hand')
        };
    }
    return clockElements;
}

// Set initial position without animation to prevent stutter
function setInitialPosition() {
    const elements = getCacheClockElements();
    if (!elements.hour || !elements.minute || !elements.second) return;

    // Ensure no transitions during initial positioning
    elements.hour.style.transition = 'none';
    elements.minute.style.transition = 'none';
    elements.second.style.transition = 'none';

    // Set transform origin explicitly
    elements.hour.style.transformOrigin = '30px 30px';
    elements.minute.style.transformOrigin = '30px 30px';
    elements.second.style.transformOrigin = '30px 30px';

    // Set initial time immediately
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    const smoothSeconds = seconds + milliseconds / 1000;
    const smoothMinutes = minutes + smoothSeconds / 60;
    const smoothHours = (hours % 12) + smoothMinutes / 60;

    const secondAngle = smoothSeconds * 6;
    const minuteAngle = smoothMinutes * 6;
    const hourAngle = smoothHours * 30;

    elements.hour.style.transform = `rotate(${hourAngle}deg)`;
    elements.minute.style.transform = `rotate(${minuteAngle}deg)`;
    elements.second.style.transform = `rotate(${secondAngle}deg)`;

    // Force reflow to ensure transforms are applied before animation starts
    void elements.hour.offsetHeight;
}

// Update analog and digital clock
function updateClock() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    // Smooth calculations
    const smoothSeconds = seconds + milliseconds / 1000;
    const smoothMinutes = minutes + smoothSeconds / 60;
    const smoothHours = (hours % 12) + smoothMinutes / 60;

    // Angles
    const secondAngle = smoothSeconds * 6;
    const minuteAngle = smoothMinutes * 6;
    const hourAngle = smoothHours * 30;

    // Apply transforms
    const elements = getCacheClockElements();
    if (elements.hour && elements.minute && elements.second) {
        elements.hour.style.transform = `rotate(${hourAngle}deg)`;
        elements.minute.style.transform = `rotate(${minuteAngle}deg)`;
        elements.second.style.transform = `rotate(${secondAngle}deg)`;
    }

    clockAnimationFrame = requestAnimationFrame(updateClock);
}

function initializeClock() {
    // Cancel any existing animation
    if (clockAnimationFrame) {
        cancelAnimationFrame(clockAnimationFrame);
        clockAnimationFrame = null;
    }

    // Reset cache
    clockElements = null;

    // Set initial position immediately to prevent jump/stutter
    setInitialPosition();

    // Start animation
    clockAnimationFrame = requestAnimationFrame(updateClock);
}

// Start clock when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClock);
} else {
    // DOM already loaded, initialize immediately
    initializeClock();
}

// Stop when hidden, resume when visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (clockAnimationFrame) {
            cancelAnimationFrame(clockAnimationFrame);
            clockAnimationFrame = null;
        }
    } else {
        initializeClock();
    }
});

// Clean up on unload
window.addEventListener('beforeunload', function () {
    if (clockAnimationFrame) {
        cancelAnimationFrame(clockAnimationFrame);
        clockAnimationFrame = null;
    }
});
