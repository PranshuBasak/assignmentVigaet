const swaggerJsDoc = require('swagger-jsdoc');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Use this for OpenAPI 3.0, change to swagger: "2.0" if you specifically need Swagger 2.0
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API documentation for the Food Delivery App',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./routes/useRoutes.js'], // Make sure the path to your routes file is correct
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
