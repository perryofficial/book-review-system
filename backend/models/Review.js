const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review_text: String,
  rating: { type: Number, min: 1, max: 5 },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
});

module.exports = mongoose.model('Review', ReviewSchema);