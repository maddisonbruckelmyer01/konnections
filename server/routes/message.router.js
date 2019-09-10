const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//send messages
router.post('/sendMessage', (req,res) => {
    let newMessage = req.body.message;
    let user_id = req.user.id;
    let board_id = req.body.board_id;
   
    let queryText = `INSERT INTO "messages" ("message", "user_id", "board_id")
        VALUES($1, $2, $3);`;
        
    pool.query(queryText, [newMessage, user_id, board_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error on sending message', error)
            res.sendStatus(500);
        })

})
//get messages for each board
router.get('/allMessages', (req,res) => {
    let queryText = `SELECT * FROM "messages";`;
    pool.
})

module.exports = router;