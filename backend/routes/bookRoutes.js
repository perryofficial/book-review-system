const router = require('express').Router();
const { addBook, getBooks, getBookDetail } = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.get('/', getBooks);
router.post('/', auth, addBook);
router.get('/:id', getBookDetail);

module.exports = router;