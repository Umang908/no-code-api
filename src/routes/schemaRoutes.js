const express = require('express');
const { createSchema, getSchemas } = require('../controllers/schemaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


/**
 * @swagger
 * /schema/create:
 *   post:
 *     summary: Create a new schema
 *     tags: [Schema]
 *     responses:
 *       200:
 *         description: Schema created
 */
router.post('/create', authMiddleware, createSchema);

router.get('/list', authMiddleware, getSchemas);

module.exports = router;
