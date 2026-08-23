// Google Authentication client helper
(function () {
  window.handleGoogleCredentialResponse = function (response) {
    try {
      console.log('Google Auth Credential received');
      localStorage.setItem('kebirigo_google_user', JSON.stringify({ token: response.credential }));
      const accountBtn = document.getElementById('navAccountLabel');
      if (accountBtn) accountBtn.innerText = 'My Account';
    } catch (e) {}
  };
})();
