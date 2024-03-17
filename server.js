// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config(); // Load environment variables
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pool = require('./config/database');
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/useRoutes');



// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

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

//Routes Middleware

app.use("/api", userRoute)



// Default route
app.get('/', (req, res) => {
  res.send('Food Delivery App API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
