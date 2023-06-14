const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 1015;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/hatirlatici-takvim', express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'pages', 'calendar.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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
  const username = req.body.username;
  const password = req.body.password;
  const password_repeat = req.body.password_repeat;
  const email = req.body.email;

  // Şifre doğrulama
  if (password !== password_repeat) {
    res.status(400).send("Şifreler uyuşmuyor");
    return;
  }
  db.query('INSERT INTO user (username, email, password, password_repeat) VALUES (?, ?, ?, ?)', [username, email, password, password_repeat], (err, result) => {
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

  db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error('Kullanıcı sorgulanırken bir hata oluştu:', err);
      res.status(500).send('Kullanıcı sorgulanırken bir hata oluştu');
    } else {
      if (result.length > 0) {
        console.log('Giriş başarılı');
        res.redirect('/calendar'); // Yönlendirme işlemi
      } else {
        console.log('Geçersiz kullanıcı adı veya şifre');
        res.status(401).send('Geçersiz kullanıcı adı veya şifre');
      }
    }
  });
});



// MySQL bağlantısıyla ilgili bilgilendirme yapar
db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Bağlantı kuruldu!");
});
