const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get direct messages
router.get('/', (req, res) => {
    let queryText = `SELECT "receiver" FROM "conversations" 
        WHERE "sender" = $1 GROUP BY "receiver";`;
    sender = req.user.generated_username
    console.log('user is: ',req.user.generated_username)
    pool.query(queryText, [sender])
        .then((result) => {
            console.log('direct messages:', result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error on server getting direct messages', error)
            res.sendStatus(500);
        })
})
router.get('/:receiver', (req,res) => {
    let receiver = req.params.receiver
    console.log('receiver:', receiver)
    let queryText = `SELECT * FROM "direct_messages" WHERE ("receiver_username" = $1 OR "sender_username" = $1);`
    pool.query(queryText, [receiver])
        .then((result) => {
            console.log('messages are:' , result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error on getting specific direct messages:', error)
            res.sendStatus(500);
        })
})

//send new direct message
router.post('/sendDirectMessage', (req, res) => {
    let queryText = `INSERT INTO "direct_messages" ("sender_username", "receiver_username", "message")
        VALUES($1, $2, $3);`;
    let sender_username = req.user.generated_username;
    console.log(req.user)
    let receiver_username = req.body.receiver_username;
    let message = req.body.message;
    pool.query(queryText, [sender_username, receiver_username, message])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error on posting in conversations', error)
            res.sendStatus(500)
        })
})


module.exports = router;