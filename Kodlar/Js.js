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
function showTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  
  // Saat değerini iki basamaklı formatta göstermek için kontrol yapalım
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);
  seconds = addLeadingZero(seconds);

  var time = hours + "." + minutes + "." + seconds;
  document.getElementById("clock").textContent = time;
  setTimeout(showTime, 1000);
}

function addLeadingZero(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}