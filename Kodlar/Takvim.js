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
const weekdays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const monthNames = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
];

events.push({
  date: clicked,
  title: eventTitleInput.value,
  time: eventTimeInput.value
});

function getMonthName(month) {
  return monthNames[month];
}

function openModal(date) {
   clicked = date;
 
   const eventForDay = events.find(e => e.date === clicked);
 
   if (eventForDay) {
     const eventText = document.getElementById('eventText');
     eventText.innerHTML = '';
 
     const eventTitleSpan = document.createElement('span');
     eventTitleSpan.innerText = eventForDay.title;
     eventText.appendChild(eventTitleSpan);
 
     if (eventForDay.time) {
       const eventTimeSpan = document.createElement('span');
       eventTimeSpan.innerText = eventForDay.time;
       eventText.appendChild(document.createTextNode(' - '));
       eventText.appendChild(eventTimeSpan);
     }
 
     deleteEventModal.style.display = 'block';
   } else {
     newEventModal.style.display = 'block';
   }
 
   backDrop.style.display = 'block';
 }
 

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
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
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
      time: eventTimeInput.value
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function logout(){
   window.location.href = 'http://127.0.0.1:3000/Hatirlatici Takvim/Kodlar/Giris Ekrani.html';
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
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}



initButtons();
load();
