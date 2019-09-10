const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "counselors" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then((result) => {
            console.log('counselors:', result.rows)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Server counselors get', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;