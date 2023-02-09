const db = require("../models/models.js");

const CalendarControllers = {
  getCalendar: (req, res, next) => {
    // console.log('entering middleware for getCalendar');
    const { user_id } = req.body;
    const query = "SELECT * FROM journal_entries WHERE user_id = $1";
    const values = [user_id];
    db.query(query, values)
      .then((data) => {
        res.locals.calendar = data.rows;
        // console.log('All the entries for this user: ', res.locals.calendar);
        return next();
      })
      .catch((err) => {
        return next({
          log: `Error in CalendarControllers.getCalendar: ${err}`,
          message: {
            err: "Error occurred",
          },
        });
      });
  },
};

module.exports = CalendarControllers;
