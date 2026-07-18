// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const theme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeToggle').querySelector('i');
    if (theme === 'dark-mode') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarkMode);
