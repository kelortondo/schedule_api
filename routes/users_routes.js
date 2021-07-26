//Functions pertaining to the /users endpoint
var express = require('express')
var router = express.Router();
const { verifyToken, isEmployeeOrAdmin } = require("../middleware/authJWT.js");
const { getAllUsers } = require("../controllers/users_controller.js")

router.get('/all', [verifyToken, isEmployeeOrAdmin, getAllUsers]);

//TODO: add endpoint for single user

//TODO: add endpoint for editing a client

//TODO: add endpoint for deleting a client

module.exports = router;
