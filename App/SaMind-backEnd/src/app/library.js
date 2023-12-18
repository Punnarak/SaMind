const client = require('./connection.js')
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /library:
 *   get:
 *     summary: Get library items
 *     tags:
 *       - Library
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Optional. Get a specific library item by ID.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved library items
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Book 1"
 *                 "url": "https:sample1"
 *               - id: 2
 *                 name: "Book 2"
 *                 "url": "https:sample2"
 *       '500':
 *         description: An error occurred while retrieving library items
 *         content:
 *           application/json:
 *             example:
 *               error: An error occurred
 */
router.get('/library', (req, res) => {
  const id = req.query.id; // Get the id parameter from the query
  let query = 'SELECT * FROM library';

  // Check if the id parameter is provided
  if (id) {
    query += ' WHERE id = $1';
  }

  const queryParams = id ? [id] : [];

  client.query(query, queryParams)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

/**
 * @swagger
 * /libraryAdd:
 *   post:
 *     summary: Add a new item to the library
 *     tags:
 *       - Library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully added a new item to the library
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Book 1
 *               url: https://example.com/book1
 *       '400':
 *         description: Both id, name, and url are required fields
 *         content:
 *           application/json:
 *             example:
 *               error: Both id, name, url are required fields.
 *       '500':
 *         description: An error occurred while adding a new item to the library
 *         content:
 *           application/json:
 *             example:
 *               error: An error occurred
 */
router.post('/libraryAdd', (req, res) => {
  const { id, name, url} = req.body;

  if (!id || !name || !url) {
    return res.status(400).json({ error: 'Both id, name, url are required fields.' });
  }

  const insertQuery = 'INSERT INTO library (id, name, url) VALUES ($1, $2, $3) RETURNING *';

  client.query(insertQuery, [id, name, url])
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
    });
});
  
module.exports = router;