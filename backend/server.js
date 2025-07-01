const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // <-- Import
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.use('/api/auth', authRoutes); // <-- Plug in routes

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
