const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//send messages
router.post('/sendMessage', (req,res) => {
    let newMessage = req.body.message;
    let generated_username = req.user.generated_username;
    let board_id = req.body.board_id;
   
    let queryText = `INSERT INTO "messages" ("message", "generated_username", "board_id")
        VALUES($1, $2, $3);`;

    pool.query(queryText, [newMessage, generated_username, board_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error on sending message', error)
            res.sendStatus(500);
        })

})
//get messages for each board
router.get('/:id', (req,res) => {
    let board_id = req.params.id;
    console.log('board id is', board_id)
    let queryText = `SELECT * FROM "messages" WHERE "board_id" = $1;`;
    pool.query(queryText, [board_id])
        .then((result) => {
            console.log('the messages are',result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error on getting messages', error)
            res.sendStatus(500)
        })
})

//get specific user for each message
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "messages" WHERE "`
})

module.exports = router;