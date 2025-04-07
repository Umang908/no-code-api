const express = require('express');
const { handleCRUD } = require('../controllers/dynamicController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /dynamic/{table}:
 *   post:
 *     summary: Create a record in a dynamic table
 *     tags: [Dynamic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: table
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Record created
 */
router.post('/:table', authMiddleware, handleCRUD);
router.get('/:table', authMiddleware, handleCRUD);
router.get('/:table/:id', authMiddleware, handleCRUD);
router.put('/:table/:id', authMiddleware, handleCRUD);
router.delete('/:table/:id', authMiddleware, handleCRUD);

module.exports = router;