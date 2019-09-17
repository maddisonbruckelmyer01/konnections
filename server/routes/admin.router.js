const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//get all users from the database for the admin
router.get('/users', (req, res) => {
    let queryText = `SELECT * FROM "user";`;
    pool.query(queryText) 
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            res.sendStatus(500)
        })
})

router.put('/editBoard', (req,res) => {
    let queryText = `UPDATE "board" SET "board_name"=$1, "description"=$2 WHERE "id" = $3;`;
    board_name = req.body.board_name
    console.log(board_name)
    description = req.body.description
    console.log(description)
    id = req.body.id
    console.log(id)
    pool.query(queryText, [board_name, description, id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

module.exports = router;