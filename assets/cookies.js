// Cookie consent handling
export function initCookies() {
  try {
    const consent = localStorage.getItem('kebirigo_cookie_consent');
    if (!consent) {
      showCookieBanner();
    }
  } catch (e) {}
}

export function showCookieBanner() {
  if (document.getElementById('cookieBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div>
      <h4>Cookie & Privacy Preferences</h4>
      <p>We use cookies and local storage to enhance your shopping experience, remember your cart items, and provide secure checkout.</p>
    </div>
    <div class="cookie-actions">
      <button class="cookie-btn accept" onclick="window.acceptCookies()">Accept All</button>
      <button class="cookie-btn settings" onclick="window.openCookieSettings()">Preferences</button>
    </div>
  `;
  document.body.appendChild(banner);
}

window.acceptCookies = function () {
  try {
    localStorage.setItem('kebirigo_cookie_consent', 'accepted');
  } catch (e) {}
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.remove();
  const modal = document.getElementById('cookieModalBackdrop');
  if (modal) modal.style.display = 'none';
};

window.openCookieSettings = function () {
  let modal = document.getElementById('cookieModalBackdrop');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cookieModalBackdrop';
    modal.className = 'cookie-modal-backdrop';
    modal.innerHTML = `
      <div class="cookie-modal">
        <h3>Cookie Preferences</h3>
        <p style="font-size:13px;color:#555;margin-bottom:15px;">Configure which cookies and local storage items you allow:</p>
        <div class="cookie-option">
          <input type="checkbox" checked disabled id="cookieEssential">
          <div>
            <strong>Strictly Essential</strong>
            <p style="font-size:12px;margin:2px 0 0;color:#666;">Required for cart functionality, order processing, and security.</p>
          </div>
        </div>
        <div class="cookie-option">
          <input type="checkbox" checked id="cookieAnalytics">
          <div>
            <strong>Analytics & Performance</strong>
            <p style="font-size:12px;margin:2px 0 0;color:#666;">Helps us measure site traffic and optimize your shopping experience.</p>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end;">
          <button class="cookie-btn settings" onclick="document.getElementById('cookieModalBackdrop').style.display='none'">Close</button>
          <button class="cookie-btn accept" onclick="window.acceptCookies()">Save Preferences</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookies);
  } else {
    initCookies();
  }
}
