const Book = require('../models/bookModel');
const Review = require('../models/reviewModel');

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const book = await Book.create({
      title,
      author,
      genre,
      description,
      createdBy: req.user.userId
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 5 } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.length
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

    res.json({ ...book._doc, averageRating: avgRating.toFixed(2), reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.searchBooks = async (req, res) => {
    try {
      const { q } = req.query;
      const regex = new RegExp(q, 'i');
      const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  