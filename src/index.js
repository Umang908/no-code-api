const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('../config/database');
const authRoutes = require('./routes/authRoutes');
const schemaRoutes = require('./routes/schemaRoutes');
const dynamicRoutes = require('./routes/dynamicRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/schema', schemaRoutes);
app.use('/api/dynamic', dynamicRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
    console.log("hello");
    res.send('No-Code API Generator is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));