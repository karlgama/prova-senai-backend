const { Router } = require("express");
const BookController = require("../controllers/bookController");
const middlewareAuth = require("../middlewares/authentication");
const router = Router();
const { Multer, uploadImage } = require("../middlewares/multer");

router.get("/books", BookController.list);
router.post(
  "/books",
  Multer.fields([
    {
      name: "imgPeq",
      maxCount: 1,
      
    },
    { name: "imgGrd", maxCount: 1 },
  ]),
  uploadImage,
  BookController.create
);
router.put("books/:id", middlewareAuth.bearer, BookController.update);
router.delete("/books/:id", middlewareAuth.bearer, BookController.delete);
module.exports = router;
