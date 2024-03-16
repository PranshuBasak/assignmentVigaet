// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Swagger documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API documentation for the Food Delivery App',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./routes/*.js'], // Specify route files for Swagger documentation
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup
// const organizationRoutes = require('./routes/organizationRoutes');
// const itemRoutes = require('./routes/itemRoutes');
// const pricingRoutes = require('./routes/pricingRoutes');

// app.use('/api/organizations', organizationRoutes);
// app.use('/api/items', itemRoutes);
// app.use('/api/pricing', pricingRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Food Delivery App API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
