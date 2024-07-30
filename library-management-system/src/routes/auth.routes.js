const express = require("express");
const { AuthController } = require("../controllers/auth.controller");
const { userAuth } = require("../middleware/jwt.middleware");
const router = express.Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.loginUser);
router.get("/", AuthController.getUsers);
router.get("/me", userAuth, AuthController.getUser);
router.delete("/:id", AuthController.deleteUser);
router.patch("/:id", AuthController.updateUser);

module.exports = router;
