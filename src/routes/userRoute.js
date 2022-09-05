const { Router } = require("express");
const UserController = require("../controllers/userController.js")
const middlewareAuth = require("../middlewares/authentication")
const router = Router();

router.get("/users", UserController.list)
router.get("/users/:id", UserController.findById)
router.post("/users", UserController.create)
router.delete(
  "/users/:id",
  middlewareAuth.bearer,
  UserController.delete
);
router.post(
  "/users/login",
  middlewareAuth.local,
  UserController.login
);
module.exports = router