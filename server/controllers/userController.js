const db = require('../db/dbConnection');

// Kullanıcı kaydını yapma
exports.kayit = (req, res) => {
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
};

// Kullanıcı girişi
exports.giris = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
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
};
