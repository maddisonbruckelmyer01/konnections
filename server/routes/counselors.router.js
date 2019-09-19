const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */
//get all counselors
router.get('/', rejectUnauthenticated, (req, res) => {
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
//add new counselors
router.post('/addNew', rejectUnauthenticated, (req, res) => {
    let queryText = `INSERT INTO "counselors" ("name", "website", "phone_number", "description")
        VALUES($1, $2, $3, $4);`;
    pool.query(queryText, [req.body.name, req.body.website, req.body.phone_number, req.body.description])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
});

router.delete('/deleteCounselor/:id', rejectUnauthenticated, (req,res)=> {
    let queryText = (`DELETE FROM "counselors" WHERE "id" = $1`)
    id = req.params.id
    console.log(id)
    pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

module.exports = router;