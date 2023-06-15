const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const app = express();
const port = 1015;
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/hatirlatici-takvim', express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..')));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'calendar.html'));
});

// MySQL bağlantısını sağlar
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '123456',
  database: 'hatirlatici-takvim'
});

// Kullanıcı kaydını yapma
app.post('/kayit', (req, res) => {
  const { username, password, password_repeat, email } = req.body;

  // Şifre tekrarı dogrulama
  if (password !== password_repeat) {
    res.status(400).send("Şifreler uyuşmuyor");
    return;
  }
  db.query('INSERT INTO users (username, email, password, password_repeat) VALUES (?, ?, ?, ?)', [username, email, password, password_repeat], (err, result) => {
    if (err) {
      console.error('Kullanıcı kaydedilirken bir hata oluştu:', err);
      res.status(500).send('Kullanıcı kaydedilirken bir hata oluştu');
    } else {
      console.log('Kullanıcı başarıyla kaydedildi');
      res.status(200).send('Kullanıcı başarıyla kaydedildi');
    }
  });
});

// Kullanıcı girişi
app.post('/giris', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error('Kullanıcı sorgulanırken bir hata oluştu:', err);
      res.status(500).send('Kullanıcı sorgulanırken bir hata oluştu');
    } else {
      if (result.length > 0) {
        console.log('Giriş başarılı');
        req.session.userID = result[0].id; // Kullanıcının kimliğini oturum nesnesine atama
        res.redirect('/calendar'); // Yönlendirme işlemi
      } else {
        console.log('Geçersiz kullanıcı adı veya şifre');
        res.status(401).send('Geçersiz kullanıcı adı veya şifre');
      }
    }
  });
});

// Etkinlik kaydetme
app.post('/event', (req, res) => {
  const { eventDescription, eventDate, eventTime } = req.body;
  const userID = req.session.userID;

  const query = 'INSERT INTO events (eventDescription, eventDate, eventTime, userID) VALUES (?, ?, ?, ?)';
  db.query(query, [eventDescription, eventDate, eventTime, userID], (err, result) => {
    if (err) {
      console.error('Database error:', err);
    } 
  });
});

// MySQL bağlantısıyla ilgili bilgilendirme yapar
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Bağlantı kuruldu!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
