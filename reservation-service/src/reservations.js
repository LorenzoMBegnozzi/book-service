const express = require('express');
const axios = require('axios');
const router = express.Router();

let reservations = [];
let nextId = 1;

router.post('/', async (req, res) => {
  const { userId, bookId, dataReserva } = req.body;

  try {
    const response = await axios.get(`http://localhost:3001/books/${bookId}`);
    const book = response.data;

    if (book.status !== 'disponível') {
      return res.status(400).json({ error: 'Livro não está disponível' });
    }

    await axios.patch(`http://localhost:3001/books/${bookId}/status`, { status: 'reservado' });

    const reservation = {
      id: nextId++,
      userId,
      bookId,
      dataReserva,
      status: 'ativa'
    };
    reservations.push(reservation);

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar reserva', details: error.message });
  }
});

router.get('/user/:userId', (req, res) => {
  const userReservations = reservations.filter(r => r.userId == req.params.userId);
  res.json(userReservations);
});

router.delete('/:id', async (req, res) => {
  const index = reservations.findIndex(r => r.id == req.params.id);
  if (index !== -1) {
    const [removed] = reservations.splice(index, 1);
    await axios.patch(`http://localhost:3001/books/${removed.bookId}/status`, { status: 'disponível' });
    res.json({ message: 'Reserva cancelada', reserva: removed });
  } else {
    res.status(404).json({ error: 'Reserva não encontrada' });
  }
});

module.exports = router;
