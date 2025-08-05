
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import { ticketSchema } from '../schemas.js';

const router = Router();


// Get all tickets
router.get('/tickets', async (req, res) => {
  const tickets = await prisma.ticket.findMany();
  res.json(tickets);
});

// Get ticket by ID
router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
  });
  res.json(ticket);
});

// Create a new ticket
router.post('/tickets', async (req, res, next) => {
  try {
    const data = ticketSchema.parse(req.body);
    const newTicket = await prisma.ticket.create({ data });
    res.json(newTicket);
  } catch (error) {
    next(error);
  }
});

// Update a ticket
router.put('/tickets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = ticketSchema.parse(req.body);
    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data,
    });
    res.json(updatedTicket);
  } catch (error) {
    next(error);
  }
});

// Delete a ticket
router.delete('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.ticket.delete({
    where: { id },
  });
  res.json({ message: 'Ticket eliminado' });
});

export default router;
