const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());

// Make sure this line is present:
app.use('/', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

// Optional: base route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API!');
});

module.exports = app;
