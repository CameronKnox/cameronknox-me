// Theme toggle functionality
(function() {
    'use strict';
    
    const THEME_KEY = 'theme-preference';
    
    // Get theme preference from localStorage or default to system preference
    const getThemePreference = () => {
        if (localStorage.getItem(THEME_KEY)) {
            return localStorage.getItem(THEME_KEY);
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    };
    
    // Apply theme to document
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        updateIcons(theme);
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getThemePreference();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    };
    
    // Initialize theme on page load
    const initializeTheme = () => {
        // Theme is already applied by inline script, just update icons
        const theme = getThemePreference();
        updateIcons(theme);
        
        // Add event listener to toggle button
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
    };
    
    // Separate function to just update icons
    const updateIcons = (theme) => {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            const sunIcon = toggleButton.querySelector('.sun-icon');
            const moonIcon = toggleButton.querySelector('.moon-icon');
            
            if (sunIcon && moonIcon) {
                if (theme === 'dark') {
                    // Dark mode: show sun icon (to switch to light)
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                    toggleButton.setAttribute('aria-label', 'Switch to light mode');
                } else {
                    // Light mode: show moon icon (to switch to dark)
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                    toggleButton.setAttribute('aria-label', 'Switch to dark mode');
                }
            }
        }
    };
    
    // Listen for system theme changes (only if no manual preference set)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Function to reapply theme without flash
    const reapplyThemeWithoutFlash = () => {
        document.documentElement.classList.add('no-transitions');
        const theme = getThemePreference();
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('color-scheme', theme);

        // Re-enable transitions after paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('no-transitions');
            });
        });
    };

    // Handle tab visibility changes to prevent flash
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            reapplyThemeWithoutFlash();
        }
    });

    // Handle bfcache (back/forward cache) restores in production
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page was restored from bfcache
            reapplyThemeWithoutFlash();
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTheme);
    } else {
        initializeTheme();
    }
})();