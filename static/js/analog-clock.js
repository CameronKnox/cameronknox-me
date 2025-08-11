// Global clock variables
let clockInterval = null;
let clockElements = null;
let lastUpdate = 0;

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

// Optimized clock animation using requestAnimationFrame
function updateClock() {
    const now = performance.now();
    
    // Throttle updates to avoid excessive rendering
    if (now - lastUpdate < 50) { // Max 20fps
        return;
    }
    lastUpdate = now;
    
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();
    
    // Calculate smooth angles
    const smoothSeconds = seconds + (milliseconds / 1000);
    const secondAngle = (smoothSeconds * 6) - 90;
    const minuteAngle = (minutes * 6 + smoothSeconds * 0.1) - 90;
    const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90;
    
    // Get cached elements
    const elements = getCacheClockElements();
    
    if (elements.hour && elements.minute && elements.second) {
        // Use transform3d for hardware acceleration
        elements.hour.style.transform = `rotate(${hourAngle}deg)`;
        elements.minute.style.transform = `rotate(${minuteAngle}deg)`;
        elements.second.style.transform = `rotate(${secondAngle}deg)`;
    }
}

// Use requestAnimationFrame for smooth animation
function animateClock() {
    updateClock();
    if (clockInterval) {
        requestAnimationFrame(animateClock);
    }
}

function initializeClock() {
    // Clear any existing interval
    if (clockInterval) {
        clockInterval = false;
    }
    
    // Reset cached elements in case of page navigation
    clockElements = null;
    
    // Set initial time
    updateClock();
    
    // Start animation loop
    clockInterval = true;
    requestAnimationFrame(animateClock);
}

// Initialize clock when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeClock);

// Re-initialize on page visibility change (handles tab switching)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateClock(); // Sync time when tab becomes visible
    }
});

// Handle page unload to clean up
window.addEventListener('beforeunload', function() {
    clockInterval = false;
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clockInterval = false;
    } else {
        initializeClock();
    }
});