const express = require('express');
const app = express();
const reservationRouter = require('./reservations');

app.use(express.json());
app.use('/reservations', reservationRouter);

app.listen(3002, () => {
  console.log('reservation-service rodando na porta 3002');
});
