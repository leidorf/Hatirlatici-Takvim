const mysql = require('mysql2');

// MySQL bağlantısını sağlar
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '123456',
  database: 'hatirlatici-takvim'
});

// MySQL bağlantısıyla ilgili bilgilendirme yapar
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Bağlantı kuruldu!");
});

module.exports = db;
