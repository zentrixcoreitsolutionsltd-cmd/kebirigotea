(function () {
  let isLargeText = false;
  let isHighContrast = false;

  window.toggleLargeText = function () {
    isLargeText = !isLargeText;
    document.body.classList.toggle('large-text', isLargeText);
  };

  window.toggleHighContrast = function () {
    isHighContrast = !isHighContrast;
    document.body.classList.toggle('high-contrast', isHighContrast);
  };
})();
