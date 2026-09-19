const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      index: true,
    },
    authors: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Programming',
        'DSA',
        'Web Development',
        'DBMS',
        'Operating Systems',
        'Computer Networks',
        'Software Engineering',
        'System Design',
        'AI',
        'Machine Learning',
        'Data Science',
        'Cybersecurity',
        'Cryptography',
        'Cloud',
        'Distributed Systems',
        'Mathematics',
      ],
      index: true,
    },
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Research'],
      default: 'Intermediate',
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    publisher: {
      type: String,
      trim: true,
    },
    edition: {
      type: String,
      default: '',
    },
    officialUrl: {
      type: String,
      required: [true, 'Official publisher or legal catalog link is required'],
      trim: true,
    },
    libraryUrl: {
      type: String,
      trim: true,
    },
    coverImageUrl: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
        index: true,
      },
    ],
    isStandardTextbook: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ category: 1, level: 1 });
bookSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
