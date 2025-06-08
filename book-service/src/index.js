const express = require('express');
const app = express();
const booksRouter = require('./books');

app.use(express.json());
app.use('/books', booksRouter);

app.listen(3001, () => {
  console.log('book-service rodando na porta 3001');
});
