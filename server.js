const express = require("express");
const bodyParser = require("body-parser");

const auth = require("./routes/auth_routes.js");
const users = require("./routes/users_routes.js");

//const cors = require("cors");

const app = express();

/* var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.use('/auth', auth);
app.use('/users', users)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");

db.sequelize.sync();
