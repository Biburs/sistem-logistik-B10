const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// menampilkan halaman login
router.get("/login", authController.showLogin);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;