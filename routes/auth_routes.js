var express = require('express')
var router = express.Router();
const { signUp, signIn, resetPassword, changeRole } = require("../controllers/auth_controller.js");
const { verifyToken, isAdmin } = require("../middleware/authJWT.js");

router.post('/signup', (req, res) => {
  signUp(req, res);
})

router.post('/signin', (req, res) => {
  signIn(req, res);
})

router.post('/reset-password', (req, res) => {
  resetPassword(req, res);
})

router.post('/change-role', [verifyToken, isAdmin, changeRole]);

module.exports = router;
