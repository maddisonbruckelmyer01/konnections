const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get boards
router.get('/', (req,res) => {
    let queryText = `SELECT * FROM "board";`;
    pool.query(queryText)
        .then((result) => {
            console.log('boards:' ,result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('server boards get', error)
            res.sendStatus(500);
        })
})

//get messages for each board
router.get('/:id', (req,res) => {
    let queryText = `SELECT * FROM "messages" WHERE "board_id" = $1;`;
    pool.query(queryText)
        .then((result) => {
            console.log('messages for baord:', result.rows)
        })
        .catch((error) => {
            console.log('server messages for boards get error', error)
            res.sendStatus(500);
        })
})

module.exports = router;