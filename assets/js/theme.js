document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleFooter = document.getElementById('theme-toggle-footer');
    const html = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    html.setAttribute('data-theme', savedTheme);
    
    // Set initial icon
    updateThemeIcons(savedTheme);

    // Theme toggle function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }

    // Update all theme toggle icons
    function updateThemeIcons(theme) {
        const icon = theme === 'dark' ? 'bx-sun' : 'bx-moon';
        if (themeToggle) themeToggle.innerHTML = `<i class='bx ${icon}'></i>`;
        if (themeToggleFooter) themeToggleFooter.innerHTML = `<i class='bx ${icon}'></i>`;
    }

    // Add event listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleFooter) themeToggleFooter.addEventListener('click', toggleTheme);
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcons(newTheme);
        }
    });
});