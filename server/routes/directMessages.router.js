const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get direct messages
router.get('/', (req, res) => {
    let queryText = `SELECT "receiver_username" FROM "direct_messages" 
        WHERE "sender_username" = $1 GROUP BY "receiver_username";`;
    sender_id = req.user.generated_username
    pool.query(queryText, [sender_id])
        .then((result) => {
            console.log('direct messages:', result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error on server getting direct messages', error)
            res.sendStatus(500);
        })
})

//get specific messages
router.get('/:receiver_username', (req, res) => {
    let specifcMessages = req.params.receiver_username
    console.log('receiver_username', specifcMessages)
    let queryText = `SELECT * FROM "direct_messages" WHERE "receiver_username" = $1;`;
    pool.query(queryText, [specifcMessages])
        .then((result) => {
            console.log('specifc direct messages:', result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error on server getting specific direct messsages: ', error)
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
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error on sending direct message', error)
            res.sendStatus(500)
        })
})


module.exports = router;