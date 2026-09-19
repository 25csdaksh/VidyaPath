const BookService = require('../services/bookService');
const ApiResponse = require('../utils/apiResponse');

const getBooks = async (req, res, next) => {
  try {
    const { books, meta } = await BookService.getBooks(req.query);
    return ApiResponse.success(res, 'Books fetched successfully.', books, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    return ApiResponse.success(res, 'Book details fetched successfully.', book);
  } catch (err) {
    next(err);
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = await BookService.createBook(req.body, req);
    return ApiResponse.success(res, 'Book created successfully.', book, 201);
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await BookService.updateBook(req.params.id, req.body, req);
    return ApiResponse.success(res, 'Book updated successfully.', book);
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const result = await BookService.deleteBook(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
