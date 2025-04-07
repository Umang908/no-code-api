const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'No-Code API Generator',
            version: '1.0.0',
            description: 'Auto-generated APIs using Node.js and MySQL'
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./src/routes/*.js"], // Where you write documentation comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
