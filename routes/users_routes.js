var express = require('express')
var router = express.Router();
const { verifyToken, isEmployeeOrAdmin } = require("../middleware/authJWT.js");
const { getAllUsers } = require("../controllers/users_controller.js")

router.get('/', [verifyToken, isEmployeeOrAdmin, getAllUsers]);

router.post('/', (req, res) => {

})

module.exports = router;
