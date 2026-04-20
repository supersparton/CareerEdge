require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const recruiterRoutes = require('./routes/recruiter');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin', adminRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('Campus Placement API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
