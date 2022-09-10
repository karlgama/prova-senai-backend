const Book = require("../models/book/Book"); // reference to our db

class BookController {
  static async list(req, res) {
    const books = await Book.list();
    res.json(books);
  }

  static async create(req, res) {
    const { titulo, preco, detalhes, imgPeq, imgGrd } = req.body;
    console.log("peq", imgPeq);
    try {
      const book = new Book({
        titulo,
        preco,
        detalhes,
      });
      book.create();
      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  }

  static async update(req, res) {
    const { codeLivro, titulo, preco, detalhes } = req.body;

    try {
      const book = new Book({
        codeLivro,
        titulo,
        preco,
        detalhes,
      });

      const updatedBook = await book.update();

      res.status(200).json(updatedBook);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  }

  static async delete(req, res) {
    const book = await Book.findById(req.params.id);
    try {
      await book.delete();
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = BookController;
