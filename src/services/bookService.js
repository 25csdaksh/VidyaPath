const { Book } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const AuditService = require('./auditService');
const { escapeRegex } = require('../utils/sanitize');

class BookService {
  static async getBooks(query) {
    const { page, limit, skip } = getPagination(query, 12);
    const filter = {};

    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.level) {
      filter.level = query.level;
    }

    if (query.author) {
      filter.authors = new RegExp(escapeRegex(query.author.trim()), 'i');
    }

    const [books, totalItems] = await Promise.all([
      Book.find(filter).sort({ title: 1 }).skip(skip).limit(limit),
      Book.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { books, meta };
  }

  static async getBookById(id) {
    const book = await Book.findById(id);
    if (!book) {
      throw new AppError('Book not found.', HTTP_STATUS.NOT_FOUND);
    }
    return book;
  }

  static async createBook(data, req) {
    const book = await Book.create(data);
    if (req) {
      await AuditService.logAction(req, {
        action: 'CREATE',
        resourceType: 'Book',
        resourceId: book._id,
        resourceTitle: book.title,
        details: { category: book.category, authors: book.authors },
      });
    }
    return book;
  }

  static async updateBook(id, data, req) {
    const book = await Book.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!book) {
      throw new AppError('Book not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'UPDATE',
        resourceType: 'Book',
        resourceId: book._id,
        resourceTitle: book.title,
        details: { category: book.category },
      });
    }
    return book;
  }

  static async deleteBook(id, req) {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new AppError('Book not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (req) {
      await AuditService.logAction(req, {
        action: 'DELETE',
        resourceType: 'Book',
        resourceId: id,
        resourceTitle: book.title,
        details: { category: book.category },
      });
    }
    return { success: true, message: 'Book deleted successfully.' };
  }
}

module.exports = BookService;
