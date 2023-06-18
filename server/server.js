// Express ve diğer gerekli modüllerin import edilmesi
const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const db = require('./db/dbConnection');

// Express uygulamasının oluşturulması
const app = express();
const port = 1015;

// Middleware'lerin kullanılması
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyaların servis edilmesi
app.use('/hatirlatici-takvim', express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..')));

// Ana sayfanın tanımlanması
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Takvim sayfasının tanımlanması
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'calendar.html'));
});

// Kullanıcı kaydı işleminin tanımlanması
app.post('/kayit', userController.kayit);

// Kullanıcı girişi işleminin tanımlanması
app.post('/giris', userController.giris);

// Uygulamanın belirtilen port üzerinden dinlemeye başlaması
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
