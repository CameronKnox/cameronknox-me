// ================================
// Fully Smooth Local-Time Clock
// ================================
let clockAnimationFrame = null;
let clockElements = null;
const ROTATION_OFFSET = -90; // Change to 0 if hands already point to 12 o'clock

// Cache clock elements for better performance
function getCacheClockElements() {
    if (!clockElements) {
        clockElements = {
            hour: document.getElementById('hour-hand'),
            minute: document.getElementById('minute-hand'),
            second: document.getElementById('second-hand'),
            digital: document.getElementById('digital-clock')
        };
    }
    return clockElements;
}

// Format time with leading zeros
function pad(num) {
    return num.toString().padStart(2, '0');
}

// Update analog and digital clock
function updateClock() {
    const time = new Date(); // Local device time
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    // Smooth calculations
    const smoothSeconds = seconds + milliseconds / 1000;
    const smoothMinutes = minutes + smoothSeconds / 60;
    const smoothHours = (hours % 12) + smoothMinutes / 60;

    // Angles
    const secondAngle = smoothSeconds * 6 + ROTATION_OFFSET;
    const minuteAngle = smoothMinutes * 6 + ROTATION_OFFSET;
    const hourAngle = smoothHours * 30 + ROTATION_OFFSET;

    // Apply transforms
    const elements = getCacheClockElements();
    if (elements.hour && elements.minute && elements.second) {
        elements.hour.style.transform = `rotate(${hourAngle}deg)`;
        elements.minute.style.transform = `rotate(${minuteAngle}deg)`;
        elements.second.style.transform = `rotate(${secondAngle}deg)`;
    }

    // Update digital clock (HH:MM:SS)
    if (elements.digital) {
        elements.digital.textContent = 
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    clockAnimationFrame = requestAnimationFrame(updateClock);
}

function initializeClock() {
    cancelAnimationFrame(clockAnimationFrame);
    clockElements = null; // Reset cache
    updateClock();
}

// Start clock when DOM is ready
document.addEventListener('DOMContentLoaded', initializeClock);

// Stop when hidden, resume when visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        cancelAnimationFrame(clockAnimationFrame);
    } else {
        initializeClock();
    }
});

// Clean up on unload
window.addEventListener('beforeunload', function () {
    cancelAnimationFrame(clockAnimationFrame);
});
