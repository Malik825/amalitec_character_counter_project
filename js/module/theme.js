export function setupThemeSwitcher({ toggleBtn, themeIcon }) {
    let currentTheme = localStorage.getItem('theme') || 'light-theme';
  
    function toggleTheme() {
      themeIcon.style.transform = 'rotate(180deg)';
      
      setTimeout(() => {
        currentTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
        document.body.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
        themeIcon.style.transform = 'rotate(0deg)';
      }, 250);
    }
  
    function updateThemeIcon() {
      themeIcon.src = currentTheme === 'light-theme'
        ? './assets/images/icon-moon.svg'
        : './assets/images/icon-sun.svg';
    }
  
    // Public API
    return {
      init: function() {
        document.body.className = currentTheme;
        updateThemeIcon();
        toggleBtn.addEventListener('click', toggleTheme);
      }
    };
  }