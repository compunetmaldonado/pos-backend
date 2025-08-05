
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

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
router.post('/tickets', async (req, res) => {
  const { clienteId, dispositivo, falla, estado, notas, precio, tecnicoAsignado, fechaEstimada } = req.body;
  const newTicket = await prisma.ticket.create({
    data: {
      clienteId,
      dispositivo,
      falla,
      estado,
      notas,
      precio,
      tecnicoAsignado,
      fechaEstimada,
    },
  });
  res.json(newTicket);
});

// Update a ticket
router.put('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { clienteId, dispositivo, falla, estado, notas, precio, tecnicoAsignado, fechaEstimada } = req.body;
  const updatedTicket = await prisma.ticket.update({
    where: { id },
    data: {
      clienteId,
      dispositivo,
      falla,
      estado,
      notas,
      precio,
      tecnicoAsignado,
      fechaEstimada,
    },
  });
  res.json(updatedTicket);
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
