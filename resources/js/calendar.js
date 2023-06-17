// Değişkenlerin tanımlanması
let nav = 0; // Gezinme değişkeni
let clicked = null; // Tıklanan tarih
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // Etkinliklerin saklandığı dizi

// HTML elementlerinin tanımlanması
const logoutButton = document.getElementById('logoutButton');
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTimeInput = document.getElementById('eventTimeInput');

// Haftanın günleri ve ayların isimlerinin tanımlanması
const weekdays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// Etkinlikler dizisine yeni bir etkinliğin eklenmesi
events.push({
	date: clicked,
	title: eventTitleInput.value,
	time: eventTimeInput.value
});

// Ay ismini döndüren fonksiyon
function getMonthName(month) {
	return monthNames[month];
}

// Yeni etkinlik penceresinin açılması
function openModal(date) {
	clicked = date;
	const eventForDay = events.filter(e => e.date === clicked);
	if (eventForDay.length > 0) {
		const eventText = document.getElementById('eventText');
		eventText.innerHTML = '';
		for (let i = 0; i < eventForDay.length; i++) {
			const eventDiv = document.createElement('div');
			eventDiv.classList.add('event');
			const eventTitleSpan = document.createElement('span');
			eventTitleSpan.innerText = eventForDay[i].title;
			eventDiv.appendChild(eventTitleSpan);
			if (eventForDay[i].time) {
				const eventTimeSpan = document.createElement('span');
				eventTimeSpan.innerText = eventForDay[i].time;
				eventDiv.appendChild(document.createTextNode(' - '));
				eventDiv.appendChild(eventTimeSpan);
			}
			eventDiv.addEventListener('click', () => {
				editEvent(eventForDay[i]);
			});
			eventText.appendChild(eventDiv);
		}
		deleteEventModal.style.display = 'block';
	} else {
		newEventModal.style.display = 'block';
		eventTitleInput.value = '';
		eventTimeInput.value = '';
	}
	backDrop.style.display = 'block';
}

// Düzenleme pencersini 
function editModal() {
	const eventForDay = events.find(e => e.date === clicked);
	if (eventForDay) {
		const eventText = document.getElementById('eventText');
		eventText.innerHTML = '';
		const eventTitleInput = document.createElement('input');
		eventTitleInput.type = 'text';
		eventTitleInput.value = eventForDay.title;
		eventText.appendChild(eventTitleInput);
		const eventTimeInput = document.createElement('input');
		eventTimeInput.type = 'time';
		eventTimeInput.value = eventForDay.time;
		eventText.appendChild(document.createElement('br'));
		eventText.appendChild(eventTimeInput);
		const saveButton = document.createElement('button');
		saveButton.innerText = 'Kaydet';
		saveButton.id = 'saveEditedButton'; // ID eklendi
		eventText.appendChild(document.createElement('br'));
		eventText.appendChild(saveButton);
		saveButton.addEventListener('click', () => saveEditedEvent(eventForDay)); // Event listener eklendi
	}
}

// Etkinlik penceresinin kapatılması
function closeModal() {
	eventTitleInput.classList.remove('error');
	newEventModal.style.display = 'none';
	deleteEventModal.style.display = 'none';
	backDrop.style.display = 'none';
	eventTitleInput.value = '';
	clicked = null;
	load();
}

// Etkinlik kaydetme
function saveEvent() {
	const eventTitleInput = document.getElementById('eventTitleInput');
	const eventTimeInput = document.getElementById('eventTimeInput');
	const title = eventTitleInput.value;
	const time = eventTimeInput.value;
	if (title && time) {
		const existingEvents = events.filter(e => e.date === clicked);
		if (existingEvents.length > 0) {
			for (let i = 0; i < existingEvents.length; i++) {
				existingEvents[i].title = title;
				existingEvents[i].time = time;
			}
		} else {
			events.push({
				date: clicked,
				title: title,
				time: time
			});
		}
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {}
}

// Etkinliğin düzenleme penceresi
function editEvent(event) {
	eventTitleInput.value = event.title;
	eventTimeInput.value = event.time;
	newEventModal.style.display = 'block';
	deleteEventModal.style.display = 'none';
	backDrop.style.display = 'block';
	document.getElementById('saveButton').removeEventListener('click', saveEvent);
	document.getElementById('saveButton').addEventListener('click', saveEditedEvent);

	function saveEditedEvent() {
		if (eventTitleInput.value) {
			eventTitleInput.classList.remove('error');
			event.title = eventTitleInput.value;
			event.time = eventTimeInput.value;
			localStorage.setItem('events', JSON.stringify(events));
			closeModal();
		} else {
			eventTitleInput.classList.add('error');
		}
	}
}

// Düzenlenen etkinliğin kaydedilmesi
function saveEditedEvent(editedEvent) {
	const eventTitleInput = document.querySelector('#eventText input[type="text"]');
	const eventTimeInput = document.querySelector('#eventText input[type="time"]');
	if (eventTitleInput.value) {
		eventTitleInput.classList.remove('error');
		editedEvent.title = eventTitleInput.value;
		editedEvent.time = eventTimeInput.value;
		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	} else {
		eventTitleInput.classList.add('error');
	}
}

// Etkinlik silme fonksiyonu
function deleteEvent() {
	events = events.filter(e => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}

// Etkinlik zamanının kontrol edilmesi
function checkEventTime() {
	const now = new Date();
	const currentTime = now.getHours() + ':' + now.getMinutes();
	const currentDay = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
	const event = events.find(e => e.date === currentDay && e.time === currentTime);
	if (event) {
		playSound(event.title);
		alert(title + " etkinliğinin zamanı gelmiştir.");
	}
}

// Etkinlik gerçeklemesi için bildirim sesi
function playSound(title) {
	const audio = new Audio('https://cdn.freesound.org/previews/668/668791_6012605-lq.mp3');
	audio.play();
}

// Takvimin yüklenmesi
function load() {
	const dt = new Date();
	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav);
	}
	const day = dt.getDate();
	const month = dt.getMonth();
	const year = dt.getFullYear();
	const firstDayOfMonth = new Date(year, month, 0);
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const paddingDays = firstDayOfMonth.getDay();
	document.getElementById('monthDisplay').innerText = `${getMonthName(month)} ${year}`;
	calendar.innerHTML = '';
	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');
		daySquare.classList.add('day');
		const dayString = `${year}-${month + 1}-${i - paddingDays}`;
		if (i > paddingDays) {
			const dayNumber = i - paddingDays;
			daySquare.innerText = dayNumber;
			if (dayNumber === day && nav === 0) {
				daySquare.id = 'currentDay';
			}
			const eventForDay = events.find(e => e.date === dayString);
			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.classList.add('event');
				const eventTitleSpan = document.createElement('span');
				eventTitleSpan.innerText = eventForDay.title;
				eventDiv.appendChild(eventTitleSpan);
				if (eventForDay.time) {
					const eventTimeSpan = document.createElement('span');
					eventTimeSpan.innerText = eventForDay.time;
					eventDiv.appendChild(document.createTextNode(' - '));
					eventDiv.appendChild(eventTimeSpan);
				}
				daySquare.appendChild(eventDiv);
			}
			daySquare.addEventListener('click', () => openModal(dayString));
		} else {
			daySquare.classList.add('padding');
		}
		calendar.appendChild(daySquare);
	}
}

// Hesaptan çıkış yapma fonksiyonu
function logout() {
	window.location.href = 'http://127.0.0.1:3000/hatirlatici-takvim/index.html';
	window.location.href = 'http://localhost:1015/';
}

// Buton tanımlamaları
function initButtons() {
	logoutButton.addEventListener('click', logout);
	document.getElementById('nextButton').addEventListener('click', () => {
		nav++;
		load();
	});
	document.getElementById('backButton').addEventListener('click', () => {
		nav--;
		load();
	});
	document.getElementById('saveButton').addEventListener('click', saveEvent);
	document.getElementById('editButton').style.display = 'none';
	document.getElementById('addButton').addEventListener('click', openModal);
	document.getElementById('closeButton').addEventListener('click', closeModal);
	document.getElementById('cancelButton').addEventListener('click', closeModal);
	document.getElementById('deleteButton').addEventListener('click', deleteEvent);
}

// Kodu çalıştırma
setInterval(checkEventTime, 60000); // 1 dakikada bir etkinlik gerçeklemesini kontrol et
initButtons();
load();