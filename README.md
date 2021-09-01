# Scheduling API
## Installation
### Dependencies:
- bcryptjs
- body-parser
- express
- jsonwebtoken
- pg
- sequelize

### Verify that you have Postgres Ready
Make sure that you have Postgres installed on your local machine, or hosted elsewhere, and are aware of the IP and port on which it is running.
Also verify that you have created a DB with the name you plan to use below in the config files, or else it will not work.
### Create Local Files
```
git clone https://github.com/kelortondo/schedule_api.git
cd schedule_api
mkdir config
cd config
touch auth_config.js db_config.js
```
Open the `auth_config.js` file and paste in the following:
```
module.exports = {
  secret: <string of your choosing>
};
```

Open the `db_config.js` file and paste in the following (all values are strings):
```
module.exports = {
  HOST: <wherever your Postgres DB is hosted>,
  USER: <Postgres user ID>,
  PASSWORD: <Postgres pw>,
  DB: <DB name>,
  dialect: "postgres"
}
```
Run `npm install` followed by `npm run start`.

Using a utility such as Postman, make a POST request to  http://localhost:8080/auth/signup to create a new user (see API documentation below for required parameters).

Using a utility such as Postman, make a POST request to http://localhost:8080/auth/signin to get a token that can be used to access the other endpoints. Also make note of the UUID.

## Endpoints
### `/auth`
<b>For creating new users and validating returning users</b>

##### `POST /auth/signup`
Creates a new user.
Accepts the following body params, all of which are strings:
- `username`
- `firstName`
- `lastName`
- `dob`
- `phone`
- `email`
- `password`

Returns:
- `uuid` (unique user id, a string)
- `role` (permissions role as an integer)

##### `POST /auth/signin`
Validates a returning user.
Accepts the following body params, all of which are strings:
- `username`
- `password`

Returns:
- `uuid` (unique user id, a string)
- `role` (permissions role as an integer)
- `accessToken` (string)

##### `POST /auth/reset-password`
Resets a user's password.
Accepts the following body params, all of which are strings:
- `username`
- `newPassword`

Returns:
- 200 code on success
- 500 code on failure

### `/users`
<b>For retrieving user information</b>

##### `GET /users/all`
Requires an administrator or employee role to return all users.
Accepts a single body parameter, as a string:
- `uuid` (unique user id, who is making the query)

Requires a single `x-code-access` value in the header:
- The token returned from posting to the `/auth/signin` endpoint

Returns an array of all users in the following shape:
```
[
    {
        "username": <string>,
        "firstName": <string>,
        "lastName": <string>,
        "dob": "YYYY-MM-DDT00:00:00.000Z",
        "phone": "XXX-XXX-XXXX",
        "email": "XXX@XXX",
        "uuid": <string>,
        "Role": {
            "name": <string name of role>
        }
    },
    {
        ...
    }
]
```