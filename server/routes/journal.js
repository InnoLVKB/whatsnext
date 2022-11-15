const express = require("express")
const journal = express.Router();



//Journal New Post    date,entry,mood,user_id   res: {id,date,entry,mood,user_id}
user.post('/new', function(req,res) {
    return res.status(200);
})

//Journal Post    date, user_id   res: {id,date,entry,mood,user_id}
user.post('/:date', function(req,res) {
    return res.status(200);
})

//Journal Post Update    id, user_id, new entry   res: {id,date,entry,mood,user_id}
user.patch('/:id', function(req,res) {
    return res.status(200);
})

//Journal Post Delete   date, user_id   res: "Successfully deleted journal entry!"
user.delete('/:id', function(req,res) {
    return res.status(200).send("Successfully deleted journal entry!");
})



module.exports = journal
