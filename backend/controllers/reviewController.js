const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    reviewer: req.user.id,
    book: req.params.id,
  });
  res.status(201).json(review);
};
