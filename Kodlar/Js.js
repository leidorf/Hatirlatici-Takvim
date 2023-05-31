window.addEventListener("DOMContentLoaded", function() {
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");

  loginForm.style.display = "block";
  signupForm.style.display = "none";
});

function toggleForm() {
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");
  var toggleButton = document.getElementById("toggle-button");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    toggleButton.innerHTML = "Giriş Yap / Kayıt Ol";
    toggleButton.style.backgroundColor = "#379b6d";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleButton.innerHTML = "Kayıt Ol / Giriş Yap";
    toggleButton.style.backgroundColor = "rgb(107, 188, 219)";
  }
}
