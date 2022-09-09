const db = require("../../database");
const { InternalServerError } = require("http-errors");

module.exports = {
  list: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
                SELECT * FROM books 
            `,
        (error, books) => {
          if (error || !books) return reject(`Error: ${error.message}`);
          return resolve(books);
        }
      );
    });
  },

  create: (book) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO books(
                    titulo,
                    preco,
                    detalhes
                ) VALUES(?,?,?)`,
        [book.titulo, book.preco, book.detalhes],
        (error) => {
          if (error) {
            reject(new InternalServerError("Error adding book"));
          }
          return resolve();
        }
      );
    });
  },

  delete: (book) => {
    return new Promise((resolve, reject) => {
      db.run(
        `
            DELETE FROM books
            where codeLivro = ?
        `,
        [book.codeLivro],
        (error) => {
          if (error) return reject("Deleting error: " + error.message);
          return resolve();
        }
      );
    });
  },

  update: (book) => {
    db.run(
      `UPDATE books set ? where codcodeLivro=? 
        where codeLivro = ?`,
      [book.titulo, book.preco, book.detalhes, book.codeLivro],
      (error) => {
        if (error) return reject("udpate error: " + error.message);
        return resolve();
      }
    );
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `
            SELECT * 
            FROM books
            WHERE codeLivro = ?
        `,
        [id],
        (error, user) => {
          if (error) return reject("Book not found");
          return resolve(user);
        }
      );
    });
  },
};
