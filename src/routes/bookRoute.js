const { Router } = require("express");
const BookController = require("../controllers/bookController");
const middlewareAuth = require("../middlewares/authentication");
const router = Router();

router.get("/books", BookController.list);
router.post("/books",  BookController.create);
router.put("books/:id", middlewareAuth.bearer, BookController.update);
router.delete("/books/:id", middlewareAuth.bearer, BookController.delete);
module.exports = router;
