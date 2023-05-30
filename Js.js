var loginForm = document.getElementById("login-form");
var signupForm = document.getElementById("signup-form");

function toggleForm() {
  if (loginForm.style.display === "none") {
    // Eğer login formu gizli ise, göster ve signup formunu gizle
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    // Eğer signup formu gizli ise, göster ve login formunu gizle
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}
