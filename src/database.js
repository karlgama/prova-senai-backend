const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db.sqlite');

const USERS_SCHEMA=`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )
`;

const BOOKS_SCHEMA=`
    CREATE TABLE IF NOT EXISTS books (
        codeLivro INTEGER PRIMARY KEY AUTOINCREMENT,
        imgPeq VARCHAR(100),
        imgGrd VARCHAR(100),
        titulo VARCHAR(100),
        preco DECIMAL(10,2) NOT NULL,
        detalhes TEXT       
    )
`;
   
db.serialize(() => {
    db.run('PRAGMA foreign_keys=ON');
    db.run(USERS_SCHEMA);
    db.run(BOOKS_SCHEMA);
  
    db.each('SELECT * FROM users', (err, user) => {
      console.log('Users: ');
      console.log(user);      
    });
  });

  module.exports = db;