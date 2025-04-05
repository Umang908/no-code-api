const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('../config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send('No-Code API Generator is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));