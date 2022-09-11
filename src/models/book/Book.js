const bookDao = require("./bookDao.js");

class Book {
  constructor(book) {
    // nomes dos campos estão em portugues para respeitar o MER
    this.codeLivro = book.codeLivro;
    this.titulo = book.titulo;
    this.preco = book.preco;
    this.imgPeq = book.imgPeq
    this.imgGrd = book.imgGrd
    this.detalhes = book.detalhes;
  }

  static list() {
    return bookDao.list();
  }

  async create() {
    return bookDao.create(this);
  }

  async delete() {
    return bookDao.delete(this);
  }
  async update() {
    return bookDao.update(this);
  }
  static async findById(id) {
    const book = await bookDao.findById(id);
    return book ? new book(book) : null;
  }
}

module.exports = Book;
