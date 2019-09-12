const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get direct messages
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "direct_messages";`;
    pool.query(queryText)
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
            alert('Your message has been sent!')
        })
        .catch((error) => {
            console.log('error on sending direct message', error)
            res.sendStatus(500)
        })
})

module.exports = router;