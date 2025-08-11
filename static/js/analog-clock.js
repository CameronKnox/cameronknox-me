// Global clock interval variable
let clockInterval = null;
let lastSecond = -1;

// Analog Clock Animation
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // Calculate smooth angles for each hand
    const smoothSeconds = seconds + (milliseconds / 1000);
    const secondAngle = (smoothSeconds * 6) - 90;
    const minuteAngle = (minutes * 6 + smoothSeconds * 0.1) - 90;
    const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90;
    
    // Get the clock hands
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    
    if (hourHand && minuteHand && secondHand) {
        // Only update if elements exist
        hourHand.style.transform = `rotate(${hourAngle}deg)`;
        minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        secondHand.style.transform = `rotate(${secondAngle}deg)`;
    }
    
    lastSecond = seconds;
}

function initializeClock() {
    // Clear any existing interval to prevent multiple intervals
    if (clockInterval) {
        clearInterval(clockInterval);
    }
    
    // Set initial time immediately
    updateClock();
    
    // Start new interval - update more frequently for smoother animation
    clockInterval = setInterval(updateClock, 100);
}

// Initialize clock when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeClock);

// Re-initialize on page visibility change (handles tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateClock(); // Sync time when tab becomes visible
    }
});

// Handle page unload to clean up interval
window.addEventListener('beforeunload', function() {
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
});