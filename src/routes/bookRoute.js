const { Router } = require("express");
const BookController = require("../controllers/bookController");
const middlewareAuth = require("../middlewares/authentication");
const router = Router();
const multer = require("multer");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});
const uploadImage = require("../services/firebase");

router.get("/books", BookController.list);
router.post(
  "/books",
  Multer.single("imgPeq"),
  uploadImage,
  BookController.create
);
router.put("books/:id", middlewareAuth.bearer, BookController.update);
router.delete("/books/:id", middlewareAuth.bearer, BookController.delete);
module.exports = router;
