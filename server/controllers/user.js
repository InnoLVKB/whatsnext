const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const db = require("../models/models.js");

const UserControllers = {
  register: (req, res, next) => {
    // get username and password from request body and destructure them
    const { username, password } = req.body;
    // hash pw asynchronously before storing in db
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return next({
          log: `Error in bcrypt hash: ${err}`,
          message: { err: "Error occurred" },
        });
      }
      // query db to insert new user and return the user_id that was created
      const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id`;
      const values = [username, hash];
      db.query(query, values)
        .then((data) => {
          res.locals.username = username;
          res.locals.user_id = data.rows[0].user_id;
          return next();
        })
        .catch((err) => {
          return next({
            log: `Error in UserControllers.register: ${err}`,
            message: { err: "Error occurred" },
          });
        });
    });
  },

  login: (req, res, next) => {
    //get the username and password from the input fields
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = $1;";
    const values = [username];
    db.query(query, values)
      .then((data) => {
        console.log(data);
        //add username, password and id
        res.locals.username = username;
        res.locals.password = password;
        res.locals.user_id = data.rows[0].user_id;
        //store the password received from the DB this password is hashed
        const dbPassword = data.rows[0].password;
        bcrypt.compare(password, dbPassword, function (err, result) {
          // result == true
          if (result) {
            return next();
          } else {
            return next({
              log: `Password does not match!: ${err}`,
              message: { err: "Error occurred" },
            });
          }
        });
      })
      .catch((err) => {
        return next({
          log: `Error in UserControllers.login: ${err}`,
          message: { err: "Error occurred" },
        });
      });
  },
};

module.exports = UserControllers;
