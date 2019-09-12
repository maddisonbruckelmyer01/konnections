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

//get specific board
router.get('/:id', (req, res) => {
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
router.post('/addNew', (req,res) => {
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


module.exports = router;