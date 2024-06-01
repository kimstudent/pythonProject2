//свет
document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeBtn = document.getElementById('toggle-theme');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function applyStoredTheme() {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
    }

    toggleThemeBtn.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    applyStoredTheme();
});

