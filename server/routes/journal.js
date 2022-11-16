const express = require("express")
const journal = express.Router();
const JournalControllers = require('../controllers/journal.js')



//Journal New Post    date,entry,mood,user_id   res: {id,date,entry,mood,user_id}
journal.post('/new',
    JournalControllers.postJournal,
    function(req,res) {
        return res.status(200).json(res.locals.journal)
    }
); // "11/15/2022"

//Get Journal Post    date, user_id   res: {id,date,entry,mood,user_id}
journal.post('/date', JournalControllers.getJournal, function(req,res) {
    return res.status(200).json(res.locals.journal);
})

//Journal Post Update    id, user_id, new entry   res: {id,date,entry,mood,user_id}
journal.patch('/:id',JournalControllers.updateJournal, function(req,res) {
    return res.status(200).json(res.locals.journal);
})

//Journal Post Delete   date, user_id   res: "Successfully deleted journal entry!"
journal.delete('/:id', JournalControllers.deleteJournal, function(req,res) {
    return res.status(200).send("Successfully deleted journal entry!");
})



module.exports = journal
