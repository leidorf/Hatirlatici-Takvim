// mysql2 modülünün import edilmesi
const mysql = require('mysql2');

// MySQL bağlantısı için gerekli bilgilerin tanımlanması
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '123456',
  database: 'hatirlatici-takvim'
});

// MySQL bağlantısının sağlanması
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Bağlantı kuruldu!");
});

// Oluşturulan bağlantının dışarıya aktarılması
module.exports = db;
