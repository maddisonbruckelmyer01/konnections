const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//get boards
router.get('/', rejectUnauthenticated, (req,res) => {
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

//get specific board
router.get('/:id', rejectUnauthenticated, (req, res) => {
    let specificboard = req.params.id 
    console.log('this board id is', specificboard)
    let queryText = `SELECT * FROM "board" WHERE "id" = $1;`;
    pool.query(queryText, [specificboard])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows[0])
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

//add new board
router.post('/addNew', rejectUnauthenticated, (req,res) => {
    let queryText = `INSERT INTO "board" ("board_name", "description") 
        VALUES ($1, $2);`;
    let board_name = req.body.board_name;
    let description = req.body.description;
    pool.query(queryText, [board_name, description])
        .then((result) => {
            res.sendStatus(201)
            alert('Your board has been created!  HELLLLOOOOOOO')
        })
        .catch((error) => {
            console.log('error on adding new board', error)
            res.sendStatus(500)
        })
})

//delete a board
router.delete('/:id', rejectUnauthenticated, (req,res) => {
    if (req.user.admin === 'true') {
    let queryText = `DELETE FROM "board" WHERE "id" = $1;`
    let secondqueryText = `DELETE FROM "messages" WHERE "board_id" = $1;`;
    let id = req.params.id
    pool.query(secondqueryText, [id])
        .then((result) => {
            pool.query(queryText, [id])
                .then((result) => {
                    res.sendStatus(200)
                })
                .catch((error) => {
                    res.sendStatus(500)
                })
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
    }
})


module.exports = router;