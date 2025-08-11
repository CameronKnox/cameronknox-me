// Global clock variables
let clockInterval = null;
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

// Smooth clock animation optimized for production
function updateClock() {
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
        // Apply transforms efficiently
        elements.hour.style.transform = `rotate(${hourAngle}deg)`;
        elements.minute.style.transform = `rotate(${minuteAngle}deg)`;
        elements.second.style.transform = `rotate(${secondAngle}deg)`;
    }
}

function initializeClock() {
    // Clear any existing interval
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
    
    // Reset cached elements in case of page navigation
    clockElements = null;
    
    // Set initial time immediately
    updateClock();
    
    // Use a more conservative update interval for production stability
    // 16ms ≈ 60fps, but with better compatibility than requestAnimationFrame
    clockInterval = setInterval(updateClock, 16);
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
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
    }
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }
    } else {
        // Re-sync time when tab becomes visible
        updateClock();
        if (!clockInterval) {
            initializeClock();
        }
    }
});