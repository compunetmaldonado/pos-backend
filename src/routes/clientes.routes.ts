
import { Router } from 'express';
import prisma from '../../lib/prisma.js';
import { clienteSchema } from '../schemas.js';

const router = Router();


// Get all clients
router.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

// Get client by ID
router.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const cliente = await prisma.cliente.findUnique({
    where: { id },
  });
  res.json(cliente);
});

// Create a new client
router.post('/clientes', async (req, res, next) => {
  try {
    const data = clienteSchema.parse(req.body);
    const newCliente = await prisma.cliente.create({ data });
    res.json(newCliente);
  } catch (error) {
    next(error);
  }
});

// Update a client
router.put('/clientes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = clienteSchema.parse(req.body);
    const updatedCliente = await prisma.cliente.update({
      where: { id },
      data,
    });
    res.json(updatedCliente);
  } catch (error) {
    next(error);
  }
});

// Delete a client
router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.cliente.delete({
    where: { id },
  });
  res.json({ message: 'Cliente eliminado' });
});

export default router;
