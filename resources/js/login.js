window.addEventListener("DOMContentLoaded", function() {
	var loginForm = document.getElementById("login-form");
	var signupForm = document.getElementById("signup-form");
	loginForm.style.display = "block";
	signupForm.style.display = "none";
});

//Form değiştirme
function toggleForm() {
	var loginForm = document.getElementById("login-form");
	var signupForm = document.getElementById("signup-form");
	var toggleButton = document.getElementById("toggleButton");
	if (loginForm.style.display === "none") {
		loginForm.style.display = "block";
		signupForm.style.display = "none";
		toggleButton.innerHTML = "Giriş Yap / Kayıt Ol";
		toggleButton.style.backgroundColor = "#379b6d";
	} else {
		loginForm.style.display = "none";
		signupForm.style.display = "block";
		toggleButton.innerHTML = "Kayıt Ol / Giriş Yap";
		toggleButton.style.backgroundColor = "#4ca2ce";
	}
}

//Zamanı gösterme
function showTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	hours = addLeadingZero(hours);
	minutes = addLeadingZero(minutes);
	seconds = addLeadingZero(seconds);
	var time = hours + "." + minutes + "." + seconds;
	document.getElementById("clock").textContent = time;
	setTimeout(showTime, 1000);
}

//Saatte 0'ları gösterme
function addLeadingZero(value) {
	if (value < 10) {
		return "0" + value;
	}
	return value;
}