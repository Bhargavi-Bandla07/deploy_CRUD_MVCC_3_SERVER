// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes'); // Import faculty routes
const fileRoutes = require('./routes/fileRoutes');
dotenv.config();

const app = express();

// Use CORS and specify the frontend origin
app.use(cors({ origin: 'https://deploy-crud-mvcc-3.onrender.com' }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define routes with specific base paths
app.use('/api/students', studentRoutes);   // Student routes
app.use('/api/faculty', facultyRoutes);     // Faculty routes
app.use('/api/files', fileRoutes);          // File routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
