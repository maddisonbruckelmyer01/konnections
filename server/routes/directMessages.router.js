const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get direct messages
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "direct_messages" WHERE "sender_id" = $1;`;
    sender_id = req.user.id
    pool.query(queryText, [sender_id])
        .then((result) => {
            console.log('direct messages:', result.rows)
            res.send(result.rows)
        })
        .catch ((error) => {
            console.log('error on server getting direct messages', error)
            res.sendStatus(500);
        })
})

//send new direct message
router.post('/sendDirectMessage', (req,res) => {
    let queryText = `INSERT INTO "direct_messages" ("sender_id", "receiver_username", "message")
        VALUES($1, $2, $3);`;
    let sender_id = req.user.id;
    let receiver_username = req.body.receiver_username;
    let message = req.body.message;
    pool.query(queryText, [sender_id, receiver_username, message])
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error on sending direct message', error)
            res.sendStatus(500)
        })
})

module.exports = router;