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

module.exports = router;