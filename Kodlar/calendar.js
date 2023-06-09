let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const logoutButton = document.getElementById('logoutButton');
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTimeInput = document.getElementById('eventTimeInput');
const weekdays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const monthNames = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];

events.push({
  date: clicked,
  title: eventTitleInput.value,
  time: eventTimeInput.value
});

function getMonthName(month) {
  return monthNames[month];
}

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

  document.getElementById('monthDisplay').innerText =
    `${getMonthName(month)} ${year}`;

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

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

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

        setReminder(clicked, time); // Hatırlatıcıyı güncelle
      }
    } else {
      events.push({
        date: clicked,
        title: title,
        time: time
      });

      setReminder(clicked, time); // Hatırlatıcıyı ayarla
    }

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    // Gerekli alanlar boşsa kullanıcıyı uyarabilirsiniz.
  }
}

function setReminder(date, time) {
  const dateTimeParts = time.split(':');
  const hour = parseInt(dateTimeParts[0]);
  const minute = parseInt(dateTimeParts[1]);

  const reminderDate = new Date(date);
  reminderDate.setHours(hour, minute);

  const now = new Date();

  if (reminderDate > now) {
    const timeDifference = reminderDate.getTime() - now.getTime();

    setTimeout(() => {
      showReminderNotification(date, time);
    }, timeDifference);
  }
}

function showReminderNotification(date, time) {
  const options = {
    body: 'Etkinlik Hatırlatıcısı: ' + time,
    icon: 'https://pin.it/6LBrl1n'
  };

  if (Notification.permission === 'granted') {
    new Notification('Etkinlik Hatırlatıcısı: ' + date, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Etkinlik Hatırlatıcısı: ' + date, options);
      }
    });
  }
}

// Hatırlatıcıları etkinleştirmek için izin isteme işlemi
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}



function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function logout(){
   window.location.href = 'http://127.0.0.1:3000/Hatirlatici Takvim/Kodlar/login.html';
}

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

  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}



initButtons();
load();
