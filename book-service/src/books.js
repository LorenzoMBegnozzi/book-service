const express = require('express');
const router = express.Router();
let books = [];
let nextId = 1;

router.post('/', (req, res) => {
  const { titulo, autor } = req.body;
  const book = { id: nextId++, titulo, autor, status: 'disponível' };
  books.push(book);
  res.status(201).json(book);
});

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  book ? res.json(book) : res.status(404).send('Livro não encontrado');
});

router.put('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    const { titulo, autor } = req.body;
    book.titulo = titulo || book.titulo;
    book.autor = autor || book.autor;
    res.json(book);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

router.patch('/:id/status', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    book.status = req.body.status;
    res.json(book);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

module.exports = router;
