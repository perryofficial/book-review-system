
const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { genre, author, page = 1 } = req.query;
  const query = {};

  if (genre) query.genre = { $regex: genre, $options: 'i' }; // case-insensitive regex
  if (author) query.author = { $regex: author, $options: 'i' };

  const books = await Book.find(query)
    .skip((page - 1) * 10)
    .limit(10);

  const results = await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ book: book._id });
      const avgRating =
        reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);
      return { ...book.toObject(), avgRating };
    })
  );

  res.json(results);
};
exports.getBookDetail = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const reviews = await Review.find({ book: book._id }).populate('reviewer', 'username');
  const avgRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);
  res.json({ ...book.toObject(), avgRating, reviews });
};
