var express = require('express')
var router = express.Router();
const { signUp, signIn } = require("../controllers/auth_controller.js");

router.post('/signup', (req, res) => {
  signUp(req, res);
})

router.post('/signin', (req, res) => {
  signIn(req, res);
})

module.exports = router;
