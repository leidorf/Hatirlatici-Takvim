  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");

  // Sayfa yüklendiğinde varsayılan olarak giriş yapma formunu göster
  showLoginForm();

  function showLoginForm() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  }

  function showSignupForm() {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
