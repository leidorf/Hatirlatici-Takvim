const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const db = require('./db/dbConnection');

const app = express();
const port = 1015;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/hatirlatici-takvim', express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'calendar.html'));
});

// Kullanıcı kaydını yapma
app.post('/kayit', userController.kayit);

// Kullanıcı girişi
app.post('/giris', userController.giris);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
