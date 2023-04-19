const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Sample collection of books
let books = [
  {
    id: '1',
    title: 'Book 1',
    author: 'Author 1',
    description: 'Description 1',
    publishedDate: '2021-01-01'
  },
  {
    id: '2',
    title: 'Book 2',
    author: 'Author 2',
    description: 'Description 2',
    publishedDate: '2021-02-02'
  }
];

// GET /books: Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id: Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = books.find(book => book.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST /books: Create a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id: Update an existing book by ID
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// DELETE /books/:id: Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
