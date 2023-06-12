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

// Kullanıcı kaydını yapar
app.post('/kayit', (req, res) => {
  const kullaniciAdi = req.body.kullaniciAdi;
  const kullaniciParola = req.body.kullaniciParola;
  const kullaniciEmail = req.body.kullaniciEmail;
  const parolaDogrulama = req.body.parolaDogrulama;

  // Şifre doğrulama
  if (kullaniciParola !== parolaDogrulama) {
    res.status(400).send("Şifreler uyuşmuyor");
    return;
  }

  db.query('INSERT INTO kullanicibilgileri (kullaniciAdi, kullaniciEmail, kullaniciParola, parolaDogrulama) VALUES (?, ?, ?, ?)', [kullaniciAdi, kullaniciEmail, kullaniciParola, parolaDogrulama], (err, result) => {
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
  const { kullaniciAdi, kullaniciParola } = req.body;

  db.query('SELECT * FROM kullanicibilgileri WHERE kullaniciAdi = ? AND kullaniciParola = ?', [kullaniciAdi, kullaniciParola], (err, result) => {
    if (err) {
      console.error('Kullanıcı sorgulanırken bir hata oluştu:', err);
      res.status(500).send('Kullanıcı sorgulanırken bir hata oluştu');
    } else {
      if (result.length > 0) {
        console.log('Giriş başarılı');
        res.status(200).send('Giriş başarılı');
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
