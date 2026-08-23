(function () {
  try {
    const savedTheme = localStorage.getItem('kebirigo_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) {}

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('kebirigo_theme', next);
    } catch (e) {}
  };
})();
